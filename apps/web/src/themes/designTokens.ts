export const tokens = {
  spacing: {
    none: '0',
    xs: '0.5rem',
    sm: '1rem',
    md: '2.5rem',
    lg: '5rem',
    xl: '10rem',
    cinematic: '15rem',
  },
  typography: {
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '5xl': '6rem',
      'cinematic': 'clamp(4rem, 10vw, 8rem)',
    },
    weight: {
      light: '300',
      normal: '400',
      medium: '500',
      bold: '700',
      black: '900',
    },
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.1em',
      widest: '0.25em',
    },
    leading: {
      none: '1',
      tight: '1.1',
      snug: '1.3',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    }
  },
  animation: {
    timing: {
      snappy: '0.2s',
      smooth: '0.6s',
      fluid: '1.2s',
      cinematic: '2.5s',
      ambient: '8s',
    },
    curves: {
      easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
      easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
      linear: 'linear',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }
  },
  effects: {
    blur: {
      sm: '4px',
      md: '12px',
      lg: '24px',
      xl: '40px',
      ambient: '100px',
    },
    glow: {
      soft: '0 0 20px rgba(var(--primary-rgb), 0.2)',
      medium: '0 0 40px rgba(var(--primary-rgb), 0.4)',
      intense: '0 0 80px rgba(var(--primary-rgb), 0.6)',
    },
    radius: {
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      full: '9999px',
    }
  },
  layout: {
    maxWidth: {
      reading: '65ch',
      content: '1200px',
      cinematic: '1600px',
      full: '100%',
    }
  }
};
