import { Injectable, Logger } from '@nestjs/common';
import { SectionType } from '@ayragen/schema';
import { AnalysisResult } from './prompt-analyzer.service';

@Injectable()
export class LayoutPlanner {
  private readonly logger = new Logger(LayoutPlanner.name);

  /**
   * Plans the visual hierarchy and section order based on emotional analysis.
   * Transitioned from corporate categories to emotional storytelling.
   */
  async planLayout(analysis: AnalysisResult): Promise<SectionType[]> {
    const category = (analysis.category || 'celebration').toLowerCase();
    this.logger.log(`Planning emotional layout for category: ${category}`);

    const baseSections: SectionType[] = ['navbar'];

    switch (category) {
      case 'confession':
        baseSections.push('hero'); // Cinematic romantic hero
        baseSections.push('story-timeline'); // The journey
        baseSections.push('cinematic-reveal'); // The big question
        baseSections.push('mood-board'); // Shared memories
        break;

      case 'memorial':
        baseSections.push('hero'); // Soft, respectful hero
        baseSections.push('gallery'); // Tribute gallery
        baseSections.push('story-timeline'); // Life journey
        baseSections.push('testimonials'); // Heartfelt messages
        break;

      case 'birthday':
        baseSections.push('hero'); // Vibrant, energetic hero
        baseSections.push('gallery'); // Celebration photos
        baseSections.push('mood-board'); // Party vibes
        baseSections.push('cta'); // "Send a wish"
        break;

      case 'anniversary':
        baseSections.push('hero'); // Romantic storytelling hero
        baseSections.push('story-timeline'); // Years together
        baseSections.push('mood-board'); // Aesthetic collection
        baseSections.push('cinematic-reveal'); // Special message
        break;

      case 'apology':
        baseSections.push('hero'); // Soft minimal hero
        baseSections.push('story-timeline'); // Reflective timeline
        baseSections.push('testimonials'); // Sincere words
        baseSections.push('cta'); // "Let's talk"
        break;

      case 'celebration':
      default:
        baseSections.push('hero');
        baseSections.push('gallery');
        baseSections.push('stats');
        baseSections.push('cta');
        break;
    }

    baseSections.push('footer');

    this.logger.log(`Planned emotional sequence: ${baseSections.join(' -> ')}`);
    return baseSections;
  }
}
