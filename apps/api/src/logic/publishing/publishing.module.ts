import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { SocialService } from './social.service';
import { VideoExportService } from './video-export.service';
import { AiEngineModule } from '../ai/ai-engine.module';
import { PrismaModule } from '../../database/prisma.module';
import { CommonModule } from '../common/common.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [AiEngineModule, PrismaModule, CommonModule, AssetsModule],
  controllers: [WebsiteController],
  providers: [WebsiteService, SocialService, VideoExportService],
  exports: [WebsiteService, SocialService, VideoExportService],
})
export class PublishingModule {}
