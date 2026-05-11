export const themeConfig = {
  colors: {
    primary: {
      light: '#FF4D4D',
      dark: '#E50914',
    },
    background: {
      light: '#FFFFFF',
      dark: '#080808',
    },
    text: {
      light: '#1A1A1A',
      dark: '#FFFFFF',
    },
  },
  fonts: {
    heading: 'Outfit, sans-serif',
    body: 'Inter, sans-serif',
    cinematic: 'Playfair Display, serif',
  },
  animations: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type ThemeConfig = typeof themeConfig;
