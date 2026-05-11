import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class GenerationQueueService {
  private readonly logger = new Logger(GenerationQueueService.name);

  constructor(@InjectQueue('generation') private generationQueue: Queue) {}

  async addGenerationJob(prompt: string, userId: string) {
    this.logger.log(`Adding generation job for user ${userId} with prompt: ${prompt}`);
    
    return this.generationQueue.add('generate', {
      prompt,
      userId,
    }, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
    });
  }

  async getJobStatus(jobId: string) {
    const job = await this.generationQueue.getJob(jobId);
    if (!job) return null;
    
    return {
      id: job.id,
      status: await job.getState(),
      progress: job.progress,
      result: job.returnvalue,
      error: job.failedReason,
    };
  }
}
