import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Dynamic import to avoid compilation failure if package isn't installed yet
let cloudinary: any = null;
try { cloudinary = require('cloudinary').v2; } catch (e) {}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    if (cloudinary) {
      cloudinary.config({
        cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      });
      this.logger.log('Cloudinary initialized successfully');
    } else {
      this.logger.error('Cloudinary package not found. Please install it.');
    }
  }

  async uploadFile(file: any, folder: string = 'auragen'): Promise<any> {
    const startTime = Date.now();
    this.logger.log(`[PIPELINE] Starting upload for ${file.originalname}`);

    // Validate File Type
    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/webp', // Photos
      'video/mp4', 'video/quicktime',          // Videos
      'audio/mpeg', 'audio/wav', 'audio/mp3'   // Music
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);
    }

    if (file.size > 20 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds the 20MB limit.');
    }

    if (!cloudinary || !this.configService.get('CLOUDINARY_API_KEY')) {
      this.logger.warn(`[PIPELINE] CLOUDINARY_API_KEY missing. Mocking upload for ${file.originalname}`);
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        public_id: `mock_${Math.random().toString(36).substring(7)}`,
        secure_url: `https://mock.cloudinary.com/${file.originalname}`,
        resource_type: file.mimetype.split('/')[0],
        _diagnostics: {
          durationMs: Date.now() - startTime,
          isMock: true,
        }
      };
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto', // Automatically detect if it's image, video, or raw (audio)
          quality: 'auto',       // AI-driven optimization
          fetch_format: 'auto',  // Deliver in modern formats (WebP, etc.)
        },
        (error, result) => {
          const duration = Date.now() - startTime;
          if (error) {
            this.logger.error(`[PIPELINE] Cloudinary upload failed after ${duration}ms: ${error.message}`);
            return reject(error);
          }
          this.logger.log(`[PIPELINE] Cloudinary upload success in ${duration}ms. Public ID: ${result?.public_id}`);
          resolve({
            ...result!,
            _diagnostics: {
              durationMs: duration,
              resourceType: result?.resource_type,
              secureUrl: result?.secure_url,
            }
          });
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  /**
   * Generates a responsive, optimized URL for an asset.
   */
  getOptimizedUrl(publicId: string, options: any = {}): string {
    return cloudinary.url(publicId, {
      secure: true,
      quality: 'auto',
      fetch_format: 'auto',
      ...options,
    });
  }
}
