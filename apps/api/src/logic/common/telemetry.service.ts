import { Injectable, Logger } from '@nestjs/common';
import { OrchestrationContext } from '../ai/generation-orchestrator.service';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger('OBSERVABILITY');

  trackStep(context: OrchestrationContext, step: string, status: 'started' | 'completed') {
    const duration = Date.now() - context.startTime;
    this.logger.log(
      `[TRACE:${context.traceId}] STEP:${step.toUpperCase()} STATUS:${status.toUpperCase()} DURATION:${duration}ms`
    );
    
    // In production, this would send data to Sentry, Datadog, or Prometheus
  }

  trackCompletion(context: OrchestrationContext, totalDuration: number) {
    this.logger.log(
      `[TRACE:${context.traceId}] PIPELINE_COMPLETED TOTAL_DURATION:${totalDuration}ms USER:${context.userId}`
    );
  }

  trackFailure(context: OrchestrationContext, error: Error) {
    this.logger.error(
      `[TRACE:${context.traceId}] PIPELINE_FAILED ERROR:${error.message} STACK:${error.stack}`
    );
    
    // Send to error tracking service (e.g. Sentry)
  }

  trackMetric(name: string, value: number, tags: Record<string, string> = {}) {
    this.logger.debug(`[METRIC] ${name}: ${value} ${JSON.stringify(tags)}`);
  }

  private readonly timers = new Map<string, number>();

  startMeasure(label: string) {
    this.timers.set(label, Date.now());
    this.logger.log(`[METRIC] Starting measurement for: ${label}`);
  }

  endMeasure(label: string): number {
    const start = this.timers.get(label);
    if (!start) return 0;
    const duration = Date.now() - start;
    this.timers.delete(label);
    this.logger.log(`[METRIC] ${label} completed in ${duration}ms`);
    return duration;
  }
}
