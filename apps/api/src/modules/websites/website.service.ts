import { 
  Injectable, 
  Logger, 
  InternalServerErrorException, 
  NotFoundException, 
  ForbiddenException 
} from '@nestjs/common';
import { CloudinaryService } from '../assets/cloudinary.service';
import { TelemetryService } from '../common/telemetry.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, DeployWebsiteDto } from './dto/website.dto';

@Injectable()
export class WebsiteService {
  private readonly logger = new Logger(WebsiteService.name);

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly telemetry: TelemetryService,
    private readonly prisma: PrismaService,
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
    this.logger.log(`[PIPELINE] Routing asset ${file.originalname} to Cloudinary for website ${websiteId}`);
    
    try {
      const result = await this.cloudinaryService.uploadFile(file, `auragen/${websiteId}`);
      
      return {
        id: result.public_id,
        url: result.secure_url,
        type: result.resource_type,
        _diagnostics: result._diagnostics,
      };
    } catch (error) {
      this.logger.error(`[PIPELINE] Upload routing failed: ${error.message}`);
      throw new InternalServerErrorException('Asset upload failed at the pipeline level');
    }
  }

  async saveWebsite(projectId: string, manifest: any) {
    return this.prisma.generatedWebsite.create({
      data: {
        projectId,
        title: manifest.title,
        description: manifest.description,
        manifest: JSON.stringify(manifest), // Convert to String for SQLite compatibility
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

  async deploy(dto: DeployWebsiteDto) {
    this.logger.log(`Deploying website ${dto.websiteId} to ${dto.subdomain || 'auragen.app'}`);
    
    try {
      // Integration point for Vercel/Netlify Deployment API
      // await this.deploymentProvider.deploy(dto);
      
      return {
        success: true,
        url: `https://${dto.subdomain || 'site'}.auragen.app`,
        deployedAt: new Date(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Deployment failed. Our engineers are notified.');
    }
  }
}
