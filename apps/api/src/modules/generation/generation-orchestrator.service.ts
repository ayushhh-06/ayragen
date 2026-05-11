import { Injectable, Logger } from '@nestjs/common';
import { WebsiteManifest } from '@auragen/schema';
import { PromptAnalyzer } from './prompt-analyzer.service';
import { LayoutPlanner } from './layout-planner.service';
import { DesignTokenEngine } from './design-token-engine.service';
import { ContentSynthesizer } from './content-synthesizer.service';
import { TelemetryService } from '../common/telemetry.service';

@Injectable()
export class GenerationOrchestrator {
  private readonly logger = new Logger(GenerationOrchestrator.name);

  constructor(
    private readonly analyzer: PromptAnalyzer,
    private readonly planner: LayoutPlanner,
    private readonly tokenEngine: DesignTokenEngine,
    private readonly synthesizer: ContentSynthesizer,
    private readonly telemetry: TelemetryService,
  ) {}

  /**
   * Orchestrates the multi-step generation of a full cinematic website.
   */
  async generateFullWebsite(prompt: string): Promise<WebsiteManifest> {
    const traceId = `ORCH_${Math.random().toString(36).substring(7)}`;
    this.telemetry.startMeasure(traceId);
    this.logger.log(`[ORCHESTRATOR] Starting full generation for trace: ${traceId}`);

    // 1. Semantic and Emotional Analysis
    const analysis = await this.analyzer.analyze(prompt);

    // 2. Structural Layout Planning
    const layout = await this.planner.planLayout(analysis);

    // 3. Design Token Generation (Colors/Typography)
    const theme = await this.tokenEngine.generateTokens(analysis);

    // 4. Parallel Content Synthesis for all sections
    const sections = await Promise.all(
      layout.map(async (type, index) => {
        const content = await this.synthesizer.synthesizeSection(type, analysis);
        return {
          id: `section-${index}`,
          type,
          title: content.title || type,
          content,
          order: index,
        };
      })
    );

    const manifest: WebsiteManifest = {
      id: Math.random().toString(36).substring(7),
      title: `Project: ${prompt.slice(0, 30)}`,
      description: `AI-generated experience for: ${prompt}`,
      emotionalTone: {
        primary: analysis.emotion,
        secondary: 'elegant',
        vibe: analysis.vibe,
      },
      theme,
      sections,
      metadata: {
        traceId,
        generatedAt: new Date().toISOString(),
        pacing: analysis.vibe === 'cinematic' ? 'slow-burn' : 'snappy',
      },
    };

    this.logger.log(`[ORCHESTRATOR] Generation complete. Latency: ${this.telemetry.endMeasure(traceId)}ms`);
    return manifest;
  }
}
