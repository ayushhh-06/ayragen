import { Injectable, Logger } from '@nestjs/common';

export interface MoodProfile {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  animations: {
    mood: 'calm' | 'energetic' | 'romantic' | 'melancholic' | 'cinematic';
    intensity: number;
  };
}

@Injectable()
export class MoodEngine {
  private readonly logger = new Logger(MoodEngine.name);

  private readonly moods: Record<string, MoodProfile> = {
    'cinematic-noir': {
      name: 'Cinematic Noir',
      colors: {
        primary: '#E50914',
        secondary: '#000000',
        background: '#080808',
        text: '#FFFFFF',
        accent: '#333333',
      },
      typography: {
        heading: 'Playfair Display',
        body: 'Inter',
      },
      animations: {
        mood: 'cinematic',
        intensity: 0.8,
      },
    },
    'ethereal-dream': {
      name: 'Ethereal Dream',
      colors: {
        primary: '#FFD1DC',
        secondary: '#F0F8FF',
        background: '#FAFAFA',
        text: '#2C3E50',
        accent: '#B0E0E6',
      },
      typography: {
        heading: 'Quicksand',
        body: 'Lora',
      },
      animations: {
        mood: 'calm',
        intensity: 0.3,
      },
    },
    'vibrant-future': {
      name: 'Vibrant Future',
      colors: {
        primary: '#00F2FF',
        secondary: '#7000FF',
        background: '#05001A',
        text: '#FFFFFF',
        accent: '#FF00E5',
      },
      typography: {
        heading: 'Outfit',
        body: 'Roboto Mono',
      },
      animations: {
        mood: 'energetic',
        intensity: 0.9,
      },
    },
  };

  getMood(vibe: string): MoodProfile {
    this.logger.log(`Mapping vibe "${vibe}" to aesthetic mood profile`);
    
    if (vibe.includes('dark') || vibe.includes('cinematic')) return this.moods['cinematic-noir'];
    if (vibe.includes('soft') || vibe.includes('dream')) return this.moods['ethereal-dream'];
    if (vibe.includes('pop') || vibe.includes('neon')) return this.moods['vibrant-future'];
    
    return this.moods['cinematic-noir']; // Default
  }
}
