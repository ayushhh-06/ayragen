import { Global, Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { StatusController } from './status.controller';

@Global()
@Module({
  controllers: [StatusController],
  providers: [TelemetryService],
  exports: [TelemetryService],
})
export class CommonModule {}
