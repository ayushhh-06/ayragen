import { Injectable, Logger } from '@nestjs/common';
import { AnalysisResult } from './prompt-analyzer.service';

@Injectable()
export class DesignTokenEngine {
  private readonly logger = new Logger(DesignTokenEngine.name);

  /**
   * Generates a cohesive color palette and typography system.
   */
  async generateTokens(analysis: AnalysisResult) {
    this.logger.log(`Generating design tokens for emotion: ${analysis.emotion}`);

    const tokens = {
      colors: this.getColorsForVibe(analysis.vibe),
      typography: this.getTypographyForVibe(analysis.vibe),
      spacing: 'relaxed',
      borderRadius: 'lg',
    };

    return tokens;
  }

  private getColorsForVibe(vibe: string) {
    switch (vibe) {
      case 'cinematic':
        return {
          primary: '#E50914',
          background: '#080808',
          text: '#FFFFFF',
          accent: '#FFD700',
        };
      case 'ethereal':
        return {
          primary: '#A78BFA',
          background: '#F5F3FF',
          text: '#1E1B4B',
          accent: '#F472B6',
        };
      case 'brutalist':
        return {
          primary: '#000000',
          background: '#FFFFFF',
          text: '#000000',
          accent: '#FFFF00',
        };
      default:
        return {
          primary: '#3B82F6',
          background: '#F8FAFC',
          text: '#0F172A',
          accent: '#10B981',
        };
    }
  }

  private getTypographyForVibe(vibe: string) {
    if (vibe === 'cinematic') {
      return { heading: 'Playfair Display', body: 'Outfit' };
    }
    if (vibe === 'minimal') {
      return { heading: 'Inter', body: 'Inter' };
    }
    return { heading: 'Outfit', body: 'Inter' };
  }
}
