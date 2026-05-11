import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { AssetsController } from './assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class AssetsModule {}
