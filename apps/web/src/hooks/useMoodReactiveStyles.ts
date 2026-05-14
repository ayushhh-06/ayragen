'use client';

import { useMemo } from 'react';
import { useGenerationStore } from '@/database/state/useGenerationStore';

export const useMoodReactiveStyles = () => {
  const { manifest, atmosphere } = useGenerationStore();

  const styles = useMemo(() => {
    const emotion = manifest?.emotionalTone?.vibe || 'cinematic';
    
    // Define base physics and aesthetics based on mood
    const presets: Record<string, any> = {
      romantic: {
        easing: [0.22, 1, 0.36, 1],
        motionIntensity: 1,
        blurStrength: '40px',
        glowOpacity: 0.4,
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
        vignetteStrength: 0.6
      },
      memorial: {
        easing: [0.65, 0, 0.35, 1], // Slower, heavier
        motionIntensity: 0.5,
        blurStrength: '60px',
        glowOpacity: 0.1,
        letterSpacing: '0.05em',
        lineHeight: '1.6',
        vignetteStrength: 0.9
      },
      celebration: {
        easing: [0.34, 1.56, 0.64, 1], // Bouncy, energetic
        motionIntensity: 1.5,
        blurStrength: '20px',
        glowOpacity: 0.6,
        letterSpacing: '-0.05em',
        lineHeight: '1.0',
        vignetteStrength: 0.3
      },
      minimal: {
        easing: [0.45, 0, 0.55, 1],
        motionIntensity: 0.2,
        blurStrength: '10px',
        glowOpacity: 0.05,
        letterSpacing: '0em',
        lineHeight: '1.4',
        vignetteStrength: 0.5
      }
    };

    const preset = presets[emotion.toLowerCase()] || presets.romantic;

    return {
      ...preset,
      primaryColor: atmosphere.primaryColor,
      backgroundColor: atmosphere.backgroundColor,
      cssVars: {
        '--primary-color': atmosphere.primaryColor,
        '--bg-color': atmosphere.backgroundColor,
        '--blur-strength': preset.blurStrength,
        '--glow-opacity': preset.glowOpacity.toString(),
        '--easing': preset.easing.join(', '),
        '--letter-spacing': preset.letterSpacing,
        '--line-height': preset.lineHeight,
      }
    };
  }, [manifest, atmosphere]);

  return styles;
};
