import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param, 
  UseInterceptors, 
  UploadedFile,
  Logger,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  Request
} from '@nestjs/common';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GenerationService } from '../ai/generation.service';
import { PromptAnalyzer } from '../ai/prompt-analyzer.service';
import { WebsiteService } from './website.service';
import { SocialService } from './social.service';
import { VideoExportService } from './video-export.service';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { 
  CreateProjectDto, 
  GenerateWebsiteDto, 
  AnalyzePromptDto, 
  DeployWebsiteDto 
} from './dto/website.dto';

@ApiTags('websites')
@UseGuards(JwtAuthGuard)
@Controller('websites')
export class WebsiteController {
  private readonly logger = new Logger(WebsiteController.name);

  constructor(
    private readonly websiteService: WebsiteService,
    private readonly generationService: GenerationService,
    private readonly analyzer: PromptAnalyzer,
    private readonly socialService: SocialService,
    private readonly videoService: VideoExportService,
  ) {}

  @Post('projects')
  @ApiOperation({ summary: 'Create a new project container' })
  async createProject(@Body() dto: CreateProjectDto, @Request() req) {
    this.logger.log(`Creating project: ${dto.name}`);
    return this.websiteService.createProject(dto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user websites' })
  async getWebsites(@Request() req) {
    return this.websiteService.getUserWebsites(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific website manifest' })
  async getWebsite(@Param('id') id: string, @Request() req) {
    return this.websiteService.getWebsiteById(id, req.user.userId);
  }

  @Post('analyze')
  async analyzePrompt(@Body() dto: AnalyzePromptDto) {
    this.logger.log(`Analyzing prompt for emotional tone`);
    return this.analyzer.analyze(dto.prompt);
  }

  @Post('generate')
  async generateWebsite(@Body() dto: GenerateWebsiteDto) {
    this.logger.log(`Generating website for project: ${dto.projectId}`);
    return this.generationService.generateWebsite(dto.prompt);
  }

  @Post(':id/assets')
  @ApiOperation({ summary: 'Upload an asset (image/video/audio) to a specific website' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAssets(@Param('id') id: string, @UploadedFile() file: any, @Request() req) {
    this.logger.log(`Uploading asset for website: ${id}`);
    
    // Ownership check
    await this.websiteService.validateOwnership(id, req.user.userId);
    
    return this.websiteService.uploadAsset(id, file);
  }

  @Get('themes')
  async getThemes() {
    this.logger.log(`Fetching available cinematic themes`);
    return this.websiteService.getThemes();
  }

  @Post('deploy')
  async deployWebsite(@Body() dto: DeployWebsiteDto) {
    this.logger.log(`Triggering automatic deployment for website: ${dto.websiteId}`);
    return this.websiteService.deploy(dto);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish a website to a subdomain' })
  async publishWebsite(@Param('id') id: string, @Body() dto: { subdomain: string }, @Request() req) {
    this.logger.log(`Publishing website ${id} to subdomain: ${dto.subdomain}`);
    return this.websiteService.publish(id, dto.subdomain, req.user.userId);
  }

  @Get('public/:subdomain')
  @ApiOperation({ summary: 'Get a public website manifest by subdomain' })
  async getPublicWebsite(@Param('subdomain') subdomain: string) {
    this.logger.log(`Fetching public manifest for: ${subdomain}`);
    return this.websiteService.getPublicWebsite(subdomain);
  }

  @Post(':id/export')
  @ApiOperation({ summary: 'Export project source code' })
  async exportWebsite(@Param('id') id: string, @Request() req) {
    this.logger.log(`Exporting source code for website: ${id}`);
    const website = await this.websiteService.getWebsiteById(id, req.user.userId);
    return this.websiteService.export(website.manifest);
  }

  @Post(':id/save')
  @ApiOperation({ summary: 'Save website manifest changes' })
  async saveWebsiteChanges(@Param('id') id: string, @Body() dto: { manifest: any }, @Request() req) {
    this.logger.log(`Saving changes for website: ${id}`);
    await this.websiteService.validateOwnership(id, req.user.userId);
    return this.prisma.generatedWebsite.update({
      where: { id },
      data: {
        manifest: dto.manifest,
        updatedAt: new Date(),
      }
    });
  }

  @Post(':id/export-video')

  @Get(':id/og')
  @ApiOperation({ summary: 'Generate and get the OG image for a website' })
  async getOgImage(@Param('id') id: string, @Res() res: any) {
    const buffer = await this.socialService.generateOgImage(id);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  }
}
