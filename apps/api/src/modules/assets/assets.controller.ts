import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
  Param, 
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/:websiteId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAsset(
    @Param('websiteId') websiteId: string,
    @UploadedFile() file: any
  ) {
    if (!file) {
      throw new BadRequestException('No file provided for upload.');
    }

    const result = await this.cloudinaryService.uploadFile(file, `auragen/${websiteId}`);

    return {
      success: true,
      asset: {
        id: result.public_id,
        url: result.secure_url,
        type: result.resource_type,
        format: result.format,
        size: result.bytes,
      }
    };
  }
}
