import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from './telemetry.service';

@Controller('status')
export class StatusController {
  private readonly logger = new Logger(StatusController.name);

  constructor(
    private readonly telemetry: TelemetryService,
    private readonly configService: ConfigService,
  ) {}

  @Get('health')
  async healthCheck() {
    this.logger.log('[PIPELINE] Health check requested');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }

  @Get('pipeline-test')
  async testPipeline() {
    this.logger.log('[PIPELINE] Running full diagnostics test');
    
    this.telemetry.startMeasure('Diagnostic_Loop');
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const duration = this.telemetry.endMeasure('Diagnostic_Loop');
    
    return {
      test: 'success',
      pipeline_latency: `${duration}ms`,
      env_check: {
        openai: !!this.configService.get('OPENAI_API_KEY'),
        cloudinary: !!this.configService.get('CLOUDINARY_API_KEY'),
        database: 'not_checked',
      },
      trace_id: Math.random().toString(36).substring(2, 15),
    };
  }
}
