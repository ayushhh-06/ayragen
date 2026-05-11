import { Injectable, Logger } from '@nestjs/common';

export enum EventType {
  AI_GENERATION_SUCCESS = 'AI_GENERATION_SUCCESS',
  AI_GENERATION_FAILURE = 'AI_GENERATION_FAILURE',
  DEPLOYMENT_SUCCESS = 'DEPLOYMENT_SUCCESS',
  DEPLOYMENT_FAILURE = 'DEPLOYMENT_FAILURE',
  ASSET_UPLOAD_SUCCESS = 'ASSET_UPLOAD_SUCCESS',
  ASSET_UPLOAD_FAILURE = 'ASSET_UPLOAD_FAILURE',
  PERFORMANCE_THRESHOLD_EXCEEDED = 'PERFORMANCE_THRESHOLD_EXCEEDED',
}

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private readonly timers = new Map<string, number>();

  startMeasure(label: string) {
    this.timers.set(label, Date.now());
    this.logger.log(`[METRIC] Starting measurement for: ${label}`);
  }

  endMeasure(label: string) {
    const start = this.timers.get(label);
    if (!start) return 0;
    const duration = Date.now() - start;
    this.timers.delete(label);
    this.logger.log(`[METRIC] ${label} completed in ${duration}ms`);
    return duration;
  }

  /**
   * Tracks a specific system event with structured metadata.
   * In production, this would send data to Datadog, Sentry, or Logflare.
   */
  trackEvent(type: EventType, metadata: Record<string, any> = {}) {
    const logPayload = {
      timestamp: new Date().toISOString(),
      event: type,
      ...metadata,
    };

    // We use a structured JSON log format for easy parsing by monitoring tools
    this.logger.log(`[TELEMETRY] ${JSON.stringify(logPayload)}`);

    // logic to send to external monitoring service
    if (type.includes('FAILURE')) {
      this.sendToSentry(type, metadata);
    }
  }

  private sendToSentry(event: string, metadata: any) {
    // Integration point for Sentry.io
    this.logger.warn(`Reporting critical failure to Sentry: ${event}`);
  }
}
