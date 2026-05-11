export const MOODS = {
  CALM: 'calm',
  ENERGETIC: 'energetic',
  ROMANTIC: 'romantic',
  MELANCHOLIC: 'melancholic',
  CINEMATIC: 'cinematic',
} as const;

export const THEME_PRESETS = {
  [MOODS.ROMANTIC]: {
    colors: {
      primary: '#D4145A',
      secondary: '#FBB03B',
      background: '#FFF5F7',
      text: '#2D3436',
      accent: '#FF7675',
    },
    typography: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    animations: {
      mood: MOODS.ROMANTIC,
      intensity: 0.6,
    },
  },
  [MOODS.CINEMATIC]: {
    colors: {
      primary: '#E17055',
      secondary: '#D63031',
      background: '#000000',
      text: '#FFFFFF',
      accent: '#FAB1A0',
    },
    typography: {
      heading: 'Outfit',
      body: 'Roboto',
    },
    animations: {
      mood: MOODS.CINEMATIC,
      intensity: 0.9,
    },
  },
  // Add more presets...
};

export const getThemeByEmotion = (sentiment: string) => {
  // Logic to map sentiment words to presets
  if (sentiment.includes('love') || sentiment.includes('heart')) return THEME_PRESETS[MOODS.ROMANTIC];
  if (sentiment.includes('epic') || sentiment.includes('movie')) return THEME_PRESETS[MOODS.CINEMATIC];
  return THEME_PRESETS[MOODS.CINEMATIC]; // Default
};
