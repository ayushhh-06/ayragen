import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:    'var(--primary)',
        rose:       'var(--rose)',
        indigo:     'var(--indigo)',
        muted:      'var(--muted)',
        background: 'var(--background)',
        surface:    'var(--surface)',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body:    ['Inter', 'sans-serif'],
        label:   ['Outfit', 'sans-serif'],
      },
      animation: {
        'float':        'float 8s ease-in-out infinite',
        'float-slow':   'float 14s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 3s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'orbit':        'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-24px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
