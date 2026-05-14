import { Injectable, Logger } from '@nestjs/common';
import { WebsiteManifest } from '@auragen/schema';
import { PromptAnalyzer } from './prompt-analyzer.service';
import { DesignTokenEngine } from './design-token-engine.service';
import { ContentSynthesizer } from './content-synthesizer.service';
import { MediaService } from './media.service';
import { MusicService } from './music.service';
import { PrismaService } from '../../database/prisma.service';
import { TelemetryService } from '../common/telemetry.service';

export interface OrchestrationContext {
  traceId: string;
  userId: string;
  projectId?: string;
  prompt: string;
  startTime: number;
}

@Injectable()
export class GenerationOrchestrator {
  private readonly logger = new Logger(GenerationOrchestrator.name);

  constructor(
    private readonly analyzer: PromptAnalyzer,
    private readonly tokenEngine: DesignTokenEngine,
    private readonly synthesizer: ContentSynthesizer,
    private readonly media: MediaService,
    private readonly musicService: MusicService,
    private readonly telemetry: TelemetryService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Orchestrates the full AI generation pipeline with enterprise-grade tracing and reliability.
   */
  async generateFullWebsite(prompt: string, userId: string, projectId?: string): Promise<WebsiteManifest> {
    const context: OrchestrationContext = {
      traceId: `gen_${Math.random().toString(36).substring(7)}`,
      userId,
      projectId,
      prompt,
      startTime: Date.now(),
    };

    this.logger.log(`[ORCHESTRATOR] Starting generation pipeline for trace: ${context.traceId}`);
    
    try {
      // Phase 1: Semantic & Emotional Intelligence Analysis
      this.telemetry.trackStep(context, 'analysis', 'started');
      const analysis = await this.analyzer.analyze(prompt);
      this.telemetry.trackStep(context, 'analysis', 'completed');

      // Phase 2: Design Token Engineering
      this.telemetry.trackStep(context, 'designing', 'started');
      const theme = await this.tokenEngine.generateTokens(analysis);
      this.telemetry.trackStep(context, 'designing', 'completed');

      // Phase 3: Content Synthesis & Media Intelligence
      this.telemetry.trackStep(context, 'synthesizing', 'started');
      const layout = ['hero', 'features', 'gallery', 'cta', 'footer']; // Simplified for scale, dynamic planner can be added
      
      const sections = await Promise.all(
        layout.map(async (type, index) => {
          const sectionContent = await this.synthesizer.synthesizeSection(type, analysis);
          
          // Media Intelligence: Inject real cinematic visuals
          if (['hero', 'gallery'].includes(type.toLowerCase())) {
             const images = await this.media.searchCinematicImages(`${analysis.category} ${analysis.emotion}`, 1);
             sectionContent.backgroundImage = images[0];
          }

          return {
            id: `s_${index}_${context.traceId}`,
            type,
            title: sectionContent.title || type,
            content: sectionContent,
            order: index,
          };
        })
      );
      this.telemetry.trackStep(context, 'synthesizing', 'completed');

      // Phase 4: Music Selection
      this.telemetry.trackStep(context, 'music-sync', 'started');
      const soundtrack = await this.musicService.selectBestTrack(analysis.category, analysis.emotion);
      this.telemetry.trackStep(context, 'music-sync', 'completed');

      // Phase 5: Final Manifest Assembly
      const manifest: any = {
        id: context.traceId,
        title: analysis.title || 'Cinematic Vision',
        description: prompt,
        emotionalTone: analysis,
        theme,
        sections: sections as any,
        soundtrack: soundtrack as any,
        metadata: {
          traceId: context.traceId,
          generatedAt: new Date().toISOString(),
          userId: context.userId,
          version: '2.0.0-scale'
        }
      };

      // Phase 5: Enterprise Persistence
      if (context.projectId) {
        await this.prisma.generatedWebsite.create({
          data: {
            projectId: context.projectId,
            title: manifest.title,
            description: manifest.description,
            manifest: manifest,
          }
        });
      }

      const duration = Date.now() - context.startTime;
      this.logger.log(`[ORCHESTRATOR] Generation successful in ${duration}ms. Trace: ${context.traceId}`);
      this.telemetry.trackCompletion(context, duration);

      return manifest;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`[ORCHESTRATOR] Pipeline failed for trace ${context.traceId}: ${err.message}`);
      this.telemetry.trackFailure(context, err);
      throw err;
    }
  }
}
