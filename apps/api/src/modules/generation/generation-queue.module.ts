import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { GenerationProcessor } from './generation.processor';
import { GenerationQueueService } from './generation-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'generation',
    }),
    BullBoardModule.forFeature({
      name: 'generation',
      adapter: BullMQAdapter,
    }),
  ],
  providers: [GenerationProcessor, GenerationQueueService],
  exports: [GenerationQueueService],
})
export class GenerationQueueModule {}
