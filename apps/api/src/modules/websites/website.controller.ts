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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GenerationService } from '../generation/generation.service';
import { PromptAnalyzer } from '../generation/prompt-analyzer.service';
import { WebsiteService } from './website.service';
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
  ) {}

  @Post('projects')
  @ApiOperation({ summary: 'Create a new project container' })
  async createProject(@Body() dto: CreateProjectDto, @Request() req) {
    this.logger.log(`Creating project: ${dto.name}`);
    return this.websiteService.createProject(dto, req.user.userId);
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
}
