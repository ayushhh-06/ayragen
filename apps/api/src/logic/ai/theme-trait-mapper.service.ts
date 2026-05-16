import { Injectable } from '@nestjs/common';
import { Theme } from '@ayragen/schema';

@Injectable()
export class ThemeTraitMapper {
  /**
   * Translates emotional analysis into a full, cinematic Theme object.
   */
  mapToTheme(analysis: any): Theme {
    const { emotion, vibe, animationStyle } = analysis;

    // Base default theme
    let theme: Theme = {
      id: Math.random().toString(36).substring(7),
      name: `${emotion} ${vibe}`,
      colors: {
        primary: '#D4145A',
        secondary: '#FBB03B',
        background: '#000000',
        text: '#FFFFFF',
        accent: '#FF7675',
        muted: '#636E72',
      },
      gradients: {
        primary: 'linear-gradient(to right, #D4145A, #FBB03B)',
        background: 'radial-gradient(circle at top, #1a1a1a, #000000)',
      },
      effects: {
        glow: true,
        particles: 'stars',
        glassmorphism: true,
        grain: analysis.designTokens.grainIntensity > 0.01,
      },
      typography: {
        heading: analysis.typographyStyle.heading,
        body: analysis.typographyStyle.body,
        sizeMultiplier: 1,
      },
      spacing: {
        base: 4,
        sectionGap: '8rem',
      },
      animations: {
        mood: animationStyle || 'cinematic',
        intensity: 0.8,
        transitionSpeed: 'normal',
      },
      // Meta tokens for frontend
      borderRadius: analysis.designTokens.borderRadius,
      buttonStyle: analysis.designTokens.buttonStyle,
    };

    // Apply Emotional Trait logic
    if (emotion === 'nostalgic' || vibe === 'retro') {
      theme.colors.primary = '#E17055';
      theme.colors.background = '#2d3436';
      theme.effects.particles = 'snow';
      theme.typography.heading = 'Playfair Display';
    }

    if (emotion === 'joyful' || vibe === 'vibrant') {
      theme.colors.primary = '#FBB03B';
      theme.colors.background = '#FFFFFF';
      theme.colors.text = '#2d3436';
      theme.effects.particles = 'bubbles';
      theme.animations.intensity = 1.0;
    }

    if (vibe === 'ethereal' || emotion === 'serene') {
      theme.colors.primary = '#a29bfe';
      theme.colors.background = '#090812';
      theme.effects.particles = 'hearts';
      theme.effects.glow = true;
      theme.animations.transitionSpeed = 'slow';
    }

    return theme;
  }
}
