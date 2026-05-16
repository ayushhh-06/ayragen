import { Injectable, Logger } from '@nestjs/common';
import { WebsiteManifest } from '@ayragen/schema';
import { PromptAnalyzer, AnalysisResult } from './prompt-analyzer.service';
import { ContentSynthesizer } from './content-synthesizer.service';
import { ThemeTraitMapper } from './theme-trait-mapper.service';
import { MediaService } from './media.service';
import { TelemetryService } from '../common/telemetry.service';

@Injectable()
export class GenerationService {
  private readonly logger = new Logger(GenerationService.name);

  constructor(
    private readonly analyzer: PromptAnalyzer,
    private readonly synthesizer: ContentSynthesizer,
    private readonly themeMapper: ThemeTraitMapper,
    private readonly mediaService: MediaService,
    private readonly telemetry: TelemetryService,
  ) {}

  async generateWebsite(prompt: string): Promise<WebsiteManifest> {
    const pipelineId = `Gen_${Math.random().toString(36).substring(7)}`;
    this.telemetry.startMeasure(pipelineId);
    this.logger.log(`[PIPELINE] Starting generation flow: ${pipelineId}`);

    // 1. Analyze Emotion and Vibe using the PromptAnalyzer
    const analysis = await this.analyzer.analyze(prompt);
    
    // PRODUCTION SECURITY: Validate analysis result
    // In a real LLM scenario, we would use Zod to ensure the AI output is safe
    this.logger.log(`Analysis complete for category: ${analysis.category}`);

    // 2. Select Theme
    const theme = await this.selectTheme(analysis);

    // 3. Select Reusable Sections
    const sections = await this.selectSections(analysis);

    // 4. Generate Content for each section
    const enrichedSections = await Promise.all(
      sections.map(section => this.generateSectionContent(section, analysis))
    );

    // 5. Assemble Manifest
    return {
      id: Math.random().toString(36).substring(7),
      title: `Project: ${prompt.slice(0, 20)}...`,
      description: `An AI-generated ${analysis.vibe} experience.`,
      emotionalTone: {
        primary: analysis.emotion,
        secondary: 'sincere',
        vibe: analysis.vibe,
      },
      theme,
      sections: enrichedSections,
      metadata: {
        musicMood: analysis.musicMood,
        fontPairing: theme.typography.heading + ' & ' + theme.typography.body,
        _diagnostics: {
          pipelineId,
          totalDurationMs: this.telemetry.endMeasure(pipelineId),
        }
      },
    };
  }

  private async selectTheme(analysis: AnalysisResult) {
    return this.themeMapper.mapToTheme(analysis);
  }

  private async selectSections(analysis: AnalysisResult) {
    return analysis.sectionSelection.map((type, index) => ({
      id: `section-${index}`,
      type: type,
      content: {},
    }));
  }

  private async generateSectionContent(section: any, analysis: AnalysisResult) {
    this.logger.log(`Synthesizing content for section: ${section.type}`);
    const content = await this.synthesizer.synthesizeSection(section.type, analysis);
    
    // Fetch relevant images based on section type and analysis
    let images: string[] = [];
    if (section.type === 'HeroSection') {
      images = await this.mediaService.searchCinematicImages(`${analysis.emotion} ${analysis.vibe} background`, 1);
    } else if (section.type === 'GallerySection') {
      images = await this.mediaService.searchCinematicImages(`${analysis.emotion} ${analysis.category}`, 6);
    }

    return {
      ...section,
      title: content.title || section.type,
      content: {
        ...content,
        backgroundImage: images[0] || content.backgroundImage,
        images: images.length > 1 ? images : content.images,
      },
    };
  }
}
