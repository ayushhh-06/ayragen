import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly unsplashAccessKey: string;

  constructor(private configService: ConfigService) {
    this.unsplashAccessKey = this.configService.get<string>('UNSPLASH_ACCESS_KEY') || '';
  }

  /**
   * Searches for cinematic, high-quality images on Unsplash based on keywords.
   */
  async searchCinematicImages(query: string, count: number = 1): Promise<string[]> {
    if (!this.unsplashAccessKey) {
      this.logger.warn('Unsplash Access Key not found. Using high-quality placeholder images.');
      return this.getPlaceholderImages(query, count);
    }

    try {
      this.logger.log(`Searching Unsplash for: ${query}`);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' cinematic wallpaper')}&per_page=${count}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${this.unsplashAccessKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results.map((img: any) => img.urls.regular);
      }

      return this.getPlaceholderImages(query, count);
    } catch (error) {
      this.logger.error(`Unsplash search failed: ${error.message}`);
      return this.getPlaceholderImages(query, count);
    }
  }

  private getPlaceholderImages(query: string, count: number): string[] {
    // Using high-end placeholders from Unsplash Source or similar
    const keywords = query.split(' ').join(',');
    return Array.from({ length: count }).map((_, i) => 
      `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=80&w=1600&keywords=${keywords}`
    );
  }
}
