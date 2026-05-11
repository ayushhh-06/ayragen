import { Injectable, Logger } from '@nestjs/common';

export interface SoundtrackRecommendation {
  genre: string;
  tempo: 'slow' | 'medium' | 'fast';
  vibe: string;
  recommendedTracks: string[];
}

@Injectable()
export class SoundtrackRecommender {
  private readonly logger = new Logger(SoundtrackRecommender.name);

  recommend(mood: string): SoundtrackRecommendation {
    this.logger.log(`Recommending soundtrack for mood: ${mood}`);
    
    if (mood === 'cinematic') {
      return {
        genre: 'Orchestral Hybrid',
        tempo: 'medium',
        vibe: 'epic-emotional',
        recommendedTracks: ['Interstellar Theme Style', 'Inception Style Braams'],
      };
    }

    if (mood === 'romantic') {
      return {
        genre: 'Acoustic Piano',
        tempo: 'slow',
        vibe: 'intimate-sincere',
        recommendedTracks: ['Soft Piano Waltz', 'Gentle Cello'],
      };
    }

    return {
      genre: 'Ambient Electronic',
      tempo: 'medium',
      vibe: 'minimalist-clean',
      recommendedTracks: ['Deep Focus Ambient', 'Lo-fi Chill'],
    };
  }
}
