import { Injectable } from '@nestjs/common';

export interface StoryPoint {
  sectionType: string;
  intensity: number; // 0 to 1
  pacing: 'slow' | 'normal' | 'fast';
  vibeOverride?: string;
}

export interface NarrativeArc {
  id: string;
  name: string;
  flow: StoryPoint[];
}

@Injectable()
export class NarrativeEngine {
  /**
   * Returns a cinematic narrative arc based on the category.
   */
  getArcForCategory(category: string): NarrativeArc {
    switch (category) {
      case 'apology':
        return {
          id: 'apology-arc',
          name: 'The Sincere Journey',
          flow: [
            { sectionType: 'HeroSection', intensity: 0.2, pacing: 'slow', vibeOverride: 'melancholic' },
            { sectionType: 'ShayariSection', intensity: 0.4, pacing: 'slow' },
            { sectionType: 'TimelineSection', intensity: 0.6, pacing: 'normal' },
            { sectionType: 'PopupNotes', intensity: 0.8, pacing: 'normal' },
            { sectionType: 'EndingReveal', intensity: 1.0, pacing: 'slow', vibeOverride: 'warm' },
          ],
        };

      case 'proposal':
        return {
          id: 'proposal-arc',
          name: 'The Forever Moment',
          flow: [
            { sectionType: 'HeroSection', intensity: 0.3, pacing: 'slow', vibeOverride: 'ethereal' },
            { sectionType: 'GallerySection', intensity: 0.5, pacing: 'normal' },
            { sectionType: 'TimelineSection', intensity: 0.7, pacing: 'normal' },
            { sectionType: 'MusicPlayer', intensity: 0.9, pacing: 'fast' }, // Build-up
            { sectionType: 'EndingReveal', intensity: 1.0, pacing: 'slow', vibeOverride: 'cinematic' }, // Climax
          ],
        };

      default:
        return {
          id: 'default-arc',
          name: 'Standard Experience',
          flow: [
            { sectionType: 'HeroSection', intensity: 0.5, pacing: 'normal' },
            { sectionType: 'GallerySection', intensity: 0.7, pacing: 'normal' },
            { sectionType: 'EndingReveal', intensity: 1.0, pacing: 'normal' },
          ],
        };
    }
  }
}
