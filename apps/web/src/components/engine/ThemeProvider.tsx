'use client';

import React, { useEffect } from 'react';
import { FloatingParticles } from '../shared/FloatingParticles';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  accent: string;
  glass?: string;
  gradients?: string[];
}

interface ThemeTypography {
  heading: string;
  body: string;
}

interface ThemeEffects {
  glassmorphism?: boolean;
  particles?: string;
  animations?: string;
  grain?: boolean;
}

interface Theme {
  preset?: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  effects?: ThemeEffects;
}

// Ensure hex to rgb helper
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '192, 132, 252';
};

export const ThemeProvider = ({ theme, children }: { theme: Theme; children: React.ReactNode }) => {
  useEffect(() => {
    if (!theme?.colors) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.colors.primary || '#c084fc');
    root.style.setProperty('--primary-rgb', hexToRgb(theme.colors.primary || '#c084fc'));
    root.style.setProperty('--background', theme.colors.background || '#040407');
    root.style.setProperty('--foreground', theme.colors.text || '#fafafa');
    root.style.setProperty('--accent', theme.colors.accent || '#818cf8');
    
    if (theme.colors.gradients?.[0]) {
      root.style.setProperty('--bg-gradient', theme.colors.gradients[0]);
    }
  }, [theme]);

  const headingFont = theme?.typography?.heading || 'Playfair Display';
  const bodyFont = theme?.typography?.body || 'Inter';
  const bg = theme?.colors?.background || '#040407';
  const isGlass = theme?.effects?.glassmorphism !== false;
  const hasGrain = theme?.effects?.grain === true;
  const particles = theme?.effects?.particles;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ fontFamily: bodyFont, backgroundColor: bg, color: theme?.colors?.text || '#fafafa' }}
    >
      <style>{`
        .themed-heading { font-family: '${headingFont}', serif; font-weight: 900; letter-spacing: -0.03em; }
        .themed-card {
          background: ${isGlass ? (theme.colors.glass || 'rgba(255, 255, 255, 0.04)') : theme.colors.background};
          backdrop-filter: ${isGlass ? 'blur(20px)' : 'none'};
          border: 1px solid ${isGlass ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'};
          border-radius: 32px;
          box-shadow: ${isGlass ? '0 10px 40px -10px rgba(0,0,0,0.2)' : 'none'};
        }
      `}</style>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: theme.colors.gradients?.[0] || 'none', opacity: 0.8 }} />

      {/* Grain Overlay */}
      {hasGrain && <div className="noise" />}

      {/* Particles Overlay */}
      {particles === 'stars' && <FloatingParticles count={100} />}
      {particles === 'floating' && <FloatingParticles count={40} />}
      
      <div className="relative z-10">{children}</div>
    </div>
  );
};
