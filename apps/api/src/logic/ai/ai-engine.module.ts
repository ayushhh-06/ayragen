import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { GenerationService } from './generation.service';
import { PromptAnalyzer } from './prompt-analyzer.service';
import { GenerationOrchestrator } from './generation-orchestrator.service';
import { ContentSynthesizer } from './content-synthesizer.service';
import { ThemeTraitMapper } from './theme-trait-mapper.service';
import { TemplateEngineService } from './template-engine.service';
import { AIEditOrchestrator } from './edit-orchestrator.service';
import { NarrativeEngine } from './narrative-engine.service';
import { MemoryIntelligenceService } from './memory-intelligence.service';
import { GenerationGateway } from './generation.gateway';
import { GenerationProcessor } from './generation.processor';
import { GenerationQueueService } from './generation-queue.service';
import { MoodEngine } from './mood-engine.service';
import { SoundtrackRecommender } from './soundtrack-recommender.service';
import { LayoutPlanner } from './layout-planner.service';
import { DesignTokenEngine } from './design-token-engine.service';
import { MediaService } from './media.service';
import { MusicService } from './music.service';
import { CodeGeneratorService } from './code-generator.service';
import { ExportService } from './export.service';
import { PrismaModule } from '../../database/prisma.module';
import { TelemetryService } from '../common/telemetry.service';

import { AuthModule } from '../../security/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BullModule.registerQueue({
      name: 'generation',
    }),
    BullBoardModule.forFeature({
      name: 'generation',
      adapter: BullMQAdapter,
    }),
  ],
  providers: [
    GenerationService, 
    PromptAnalyzer, 
    GenerationOrchestrator,
    ContentSynthesizer,
    ThemeTraitMapper,
    TemplateEngineService,
    AIEditOrchestrator,
    NarrativeEngine,
    MemoryIntelligenceService,
    GenerationGateway,
    GenerationProcessor,
    GenerationQueueService,
    MoodEngine,
    SoundtrackRecommender,
    LayoutPlanner,
    DesignTokenEngine,
    MediaService,
    MusicService,
    CodeGeneratorService,
    ExportService,
    TelemetryService,
  ],
  exports: [
    GenerationService, 
    GenerationOrchestrator, 
    AIEditOrchestrator, 
    NarrativeEngine, 
    MemoryIntelligenceService,
    GenerationGateway,
    PromptAnalyzer,
    GenerationQueueService,
    CodeGeneratorService,
    ExportService,
    MusicService,
    TelemetryService,
  ],
})
export class AiEngineModule {}
