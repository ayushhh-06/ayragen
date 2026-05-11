export interface ThemePreset {
  id: string;
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    accent: string;
    glass: string;
    gradients: string[];
  };
  typography: {
    heading: string;
    body: string;
  };
  effects: {
    glassmorphism: boolean;
    particles: 'snow' | 'stars' | 'floating' | 'none';
    animations: 'smooth' | 'fluid' | 'snappy' | 'dramatic';
    grain: boolean;
  };
}

export const PRESET_THEMES: Record<string, ThemePreset> = {
  romantic: {
    id: 'romantic',
    name: 'Romantic',
    colors: {
      primary: '#f43f5e',
      background: '#2a0a18',
      text: '#ffe4e6',
      accent: '#fb7185',
      glass: 'rgba(255, 228, 230, 0.05)',
      gradients: ['linear-gradient(135deg, #f43f5e, #fb7185)'],
    },
    typography: { heading: 'Playfair Display', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'floating', animations: 'fluid', grain: true },
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy',
    colors: {
      primary: '#c084fc',
      background: '#040407',
      text: '#fafafa',
      accent: '#f9a8d4',
      glass: 'rgba(255, 255, 255, 0.03)',
      gradients: ['linear-gradient(135deg, #c084fc, #f9a8d4)'],
    },
    typography: { heading: 'Playfair Display', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'stars', animations: 'smooth', grain: true },
  },
  koreanAesthetic: {
    id: 'koreanAesthetic',
    name: 'Korean Aesthetic',
    colors: {
      primary: '#a78bfa',
      background: '#f8fafc',
      text: '#334155',
      accent: '#c4b5fd',
      glass: 'rgba(255, 255, 255, 0.5)',
      gradients: ['linear-gradient(to bottom right, #f8fafc, #e2e8f0)'],
    },
    typography: { heading: 'Outfit', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'none', animations: 'snappy', grain: false },
  },
  retroFilm: {
    id: 'retroFilm',
    name: 'Retro Film',
    colors: {
      primary: '#d97706',
      background: '#1c1917',
      text: '#fef3c7',
      accent: '#f59e0b',
      glass: 'rgba(254, 243, 199, 0.02)',
      gradients: ['radial-gradient(circle, #451a03, #1c1917)'],
    },
    typography: { heading: 'Georgia, serif', body: 'Courier New, monospace' },
    effects: { glassmorphism: false, particles: 'none', animations: 'snappy', grain: true },
  },
  luxuryBlack: {
    id: 'luxuryBlack',
    name: 'Luxury Black',
    colors: {
      primary: '#fbbf24',
      background: '#000000',
      text: '#ffffff',
      accent: '#f59e0b',
      glass: 'rgba(255, 255, 255, 0.05)',
      gradients: ['linear-gradient(135deg, #fbbf24, #d97706)'],
    },
    typography: { heading: 'Playfair Display', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'none', animations: 'smooth', grain: false },
  },
  darkLove: {
    id: 'darkLove',
    name: 'Dark Love',
    colors: {
      primary: '#be123c',
      background: '#0a0a0a',
      text: '#fecdd3',
      accent: '#e11d48',
      glass: 'rgba(254, 205, 211, 0.03)',
      gradients: ['radial-gradient(ellipse at bottom, #4c0519 0%, #0a0a0a 100%)'],
    },
    typography: { heading: 'Playfair Display', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'floating', animations: 'dramatic', grain: true },
  },
  sunsetGlow: {
    id: 'sunsetGlow',
    name: 'Sunset Glow',
    colors: {
      primary: '#f97316',
      background: '#431407',
      text: '#fff7ed',
      accent: '#fb923c',
      glass: 'rgba(255, 247, 237, 0.04)',
      gradients: ['linear-gradient(to top, #7c2d12, #ea580c, #fcd34d)'],
    },
    typography: { heading: 'Outfit', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'floating', animations: 'fluid', grain: false },
  },
  midnightStars: {
    id: 'midnightStars',
    name: 'Midnight Stars',
    colors: {
      primary: '#818cf8',
      background: '#020617',
      text: '#e0e7ff',
      accent: '#6366f1',
      glass: 'rgba(224, 231, 255, 0.03)',
      gradients: ['radial-gradient(circle at top right, #1e1b4b, #020617)'],
    },
    typography: { heading: 'Outfit', body: 'Inter' },
    effects: { glassmorphism: true, particles: 'stars', animations: 'smooth', grain: true },
  },
  softMinimal: {
    id: 'softMinimal',
    name: 'Soft Minimal',
    colors: {
      primary: '#94a3b8',
      background: '#ffffff',
      text: '#0f172a',
      accent: '#cbd5e1',
      glass: 'rgba(0, 0, 0, 0.02)',
      gradients: ['linear-gradient(to bottom, #ffffff, #f8fafc)'],
    },
    typography: { heading: 'Inter', body: 'Inter' },
    effects: { glassmorphism: false, particles: 'none', animations: 'smooth', grain: false },
  }
};
