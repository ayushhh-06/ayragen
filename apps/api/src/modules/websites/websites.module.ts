import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { GenerationModule } from '../generation/generation.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [GenerationModule, AssetsModule],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService],
})
export class WebsitesModule {}
