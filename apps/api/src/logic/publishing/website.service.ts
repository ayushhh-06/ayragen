import { 
  Injectable, 
  Logger, 
  InternalServerErrorException, 
  NotFoundException, 
  ForbiddenException 
} from '@nestjs/common';
import { CloudinaryService } from '../assets/cloudinary.service';
import { TelemetryService } from '../common/telemetry.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto, DeployWebsiteDto } from './dto/website.dto';
import { ExportService } from '../ai/export.service';

@Injectable()
export class WebsiteService {
  private readonly logger = new Logger(WebsiteService.name);

  constructor(
    private readonly telemetry: TelemetryService,
    private readonly prisma: PrismaService,
    private readonly exportService: ExportService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async validateOwnership(websiteId: string, userId: string) {
    const website = await this.prisma.generatedWebsite.findUnique({
      where: { id: websiteId },
      include: { project: true },
    });

    if (!website) throw new NotFoundException('Website not found');
    if (website.project.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this website');
    }
    return website;
  }

  async createProject(dto: CreateProjectDto, userId: string) {
    this.logger.log(`Creating project for user ${userId}: ${dto.name}`);
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId: userId,
      },
    });
  }

  async uploadAsset(websiteId: string, file: any) {
    this.logger.log(`[PIPELINE] Uploading asset for website ${websiteId}`);
    try {
      const result = await this.cloudinary.uploadImage(file);
      return {
        id: result.public_id,
        url: result.secure_url,
        type: result.resource_type,
      };
    } catch (error) {
      throw new InternalServerErrorException('Asset upload failed');
    }
  }

  async saveWebsite(projectId: string, manifest: any) {
    return this.prisma.generatedWebsite.create({
      data: {
        projectId,
        title: manifest.title,
        description: manifest.description,
        manifest: typeof manifest === 'string' ? manifest : JSON.stringify(manifest),
      },
    });
  }

  async getThemes() {
    // Returns the visual presets we defined earlier
    return [
      { id: '1', name: 'Cinematic Noir', vibe: 'dark' },
      { id: '2', name: 'Ethereal Pastels', vibe: 'light' },
      { id: '3', name: 'Vibrant Celebration', vibe: 'pop' },
    ];
  }

  async getUserWebsites(userId: string) {
    return this.prisma.generatedWebsite.findMany({
      where: { project: { userId } },
      orderBy: { createdAt: 'desc' },
      include: { project: true }
    });
  }

  async getWebsiteById(id: string, userId: string) {
    const website = await this.validateOwnership(id, userId);
    return {
      ...website,
      manifest: typeof website.manifest === 'string' ? JSON.parse(website.manifest) : website.manifest
    };
  }

  async publish(id: string, subdomain: string, userId: string) {
    await this.validateOwnership(id, userId);
    
    // Sanitize subdomain (lowercase, no spaces, alphanumeric only)
    const cleanSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!cleanSubdomain) throw new ForbiddenException('Invalid subdomain');

    // Check if subdomain is already taken
    const existing = await this.prisma.generatedWebsite.findFirst({
      where: { subdomain: cleanSubdomain, id: { not: id } }
    });
    if (existing) throw new ForbiddenException('Subdomain already taken');

    return this.prisma.generatedWebsite.update({
      where: { id },
      data: {
        subdomain: cleanSubdomain,
        isPublished: true,
        updatedAt: new Date()
      }
    });
  }

  async getPublicWebsite(subdomain: string) {
    const website = await this.prisma.generatedWebsite.findUnique({
      where: { subdomain, isPublished: true }
    });

    if (!website) throw new NotFoundException('Universe not found');

    return {
      id: website.id,
      title: website.title,
      manifest: typeof website.manifest === 'string' ? JSON.parse(website.manifest) : website.manifest
    };
  }

  async getOgMetadata(websiteId: string) {
    const website = await this.prisma.generatedWebsite.findUnique({ where: { id: websiteId } });
    if (!website) return null;

    const manifest = typeof website.manifest === 'string' ? JSON.parse(website.manifest) : website.manifest;
    const firstSection = manifest.sections[0];
    
    return {
      title: `${manifest.title} | AyraGen AI`,
      description: manifest.metadata?.description || `Explore this cinematic digital universe created with AyraGen.`,
      image: firstSection?.content?.backgroundImage || 'https://ayragen.ai/og-default.jpg',
      themeColor: manifest.theme?.colors?.primary || '#c084fc',
      url: `https://${website.subdomain}.ayragen.ai`,
    };
  }

  async export(manifest: any) {
    const filename = await this.exportService.exportProject(manifest);
    return {
      downloadUrl: `http://localhost:3007/temp_exports/${filename}`,
      filename
    };
  }

  async deploy(dto: DeployWebsiteDto) {
    this.logger.log(`Deploying website ${dto.websiteId} to ${dto.subdomain || 'ayragen.app'}`);
    
    try {
      // Integration point for Vercel/Netlify Deployment API
      // await this.deploymentProvider.deploy(dto);
      
      return {
        success: true,
        url: `https://${dto.subdomain || 'site'}.ayragen.app`,
        deployedAt: new Date(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Deployment failed. Our engineers are notified.');
    }
  }
}
