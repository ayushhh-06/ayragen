import { Injectable, Logger } from '@nestjs/common';

export interface Soundtrack {
  id: string;
  name: string;
  artist: string;
  url: string;
  moods: string[];
}

const CINEMATIC_LIBRARY: Soundtrack[] = [
  { 
    id: 'm1', 
    name: 'Eternal Waltz', 
    artist: 'AuraGen Orchestral', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    moods: ['romantic', 'anniversary', 'elegant'] 
  },
  { 
    id: 'm2', 
    name: 'Neon Horizon', 
    artist: 'Synthwave Dreams', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
    moods: ['energetic', 'celebration', 'vibrant'] 
  },
  { 
    id: 'm3', 
    name: 'Stardust Memory', 
    artist: 'Ambient Souls', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 
    moods: ['memorial', 'nostalgic', 'peaceful'] 
  },
  { 
    id: 'm4', 
    name: 'Final Confession', 
    artist: 'Piano Noir', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', 
    moods: ['confession', 'apology', 'sincere'] 
  },
];

@Injectable()
export class MusicService {
  private readonly logger = new Logger(MusicService.name);

  async selectBestTrack(category: string, emotion: string): Promise<Soundtrack> {
    this.logger.log(`AI selecting music for category: ${category}, emotion: ${emotion}`);
    
    // Find tracks that match the category or emotion
    const matches = CINEMATIC_LIBRARY.filter(track => 
      track.moods.includes(category.toLowerCase()) || 
      track.moods.includes(emotion.toLowerCase())
    );

    // Fallback if no exact match
    if (matches.length === 0) {
      this.logger.warn(`No exact music match for ${category}/${emotion}. Using default ambient.`);
      return CINEMATIC_LIBRARY[2]; // Default peaceful ambient
    }

    // Return a random match from the candidates
    return matches[Math.floor(Math.random() * matches.length)];
  }
}
