import { WebsiteManifest } from '@auragen/schema';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'Romantic' | 'Anniversary' | 'Birthday' | 'Wedding' | 'Memorial' | 'Luxury' | 'Portfolio';
  type: 'Website' | 'Letter' | 'Story' | 'Invitation';
  thumbnail: string;
  manifest: Partial<WebsiteManifest>;
}

export const TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Ethereal Love',
    description: 'A dreamy, glass-heavy theme for romantic confessions.',
    category: 'Romantic',
    type: 'Website',
    thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80',
    manifest: {
      theme: {
        colors: { primary: '#c084fc', background: '#040407', text: '#fafafa', accent: '#f9a8d4', gradients: ['linear-gradient(135deg, #c084fc, #f9a8d4)'] },
        typography: { heading: 'Playfair Display', body: 'Inter' },
        effects: { glassmorphism: true, particles: 'stars', animations: 'fluid', grain: true }
      }
    }
  },
  {
    id: 't2',
    name: 'Luxury Noir',
    description: 'High-contrast, minimalist luxury for high-end memories.',
    category: 'Luxury',
    type: 'Website',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
    manifest: {
      theme: {
        colors: { primary: '#ffffff', background: '#000000', text: '#a1a1aa', accent: '#3f3f46', gradients: [] },
        typography: { heading: 'Inter', body: 'Inter' },
        effects: { glassmorphism: false, particles: 'grain', animations: 'subtle', grain: true }
      }
    }
  },
  {
    id: 't3',
    name: 'Golden Anniversary',
    description: 'Warm, elegant tones for celebrating timeless bonds.',
    category: 'Anniversary',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    manifest: {
      theme: {
        colors: { primary: '#fbbf24', background: '#0c0a09', text: '#f5f5f4', accent: '#78350f', gradients: ['linear-gradient(to right, #fbbf24, #f59e0b)'] },
        typography: { heading: 'Outfit', body: 'Inter' },
        effects: { glassmorphism: true, particles: 'bokeh', animations: 'float', grain: false }
      }
    },
    type: 'Website'
  },
  {
    id: 't4',
    name: 'Midnight Letter',
    description: 'A deeply personal, interactive digital letter for secret messages.',
    category: 'Romantic',
    type: 'Letter',
    thumbnail: 'https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=800&q=80',
    manifest: {
      theme: {
        colors: { primary: '#ef4444', background: '#0a0a0a', text: '#ffffff', accent: '#1a1a1a', gradients: [] },
        typography: { heading: 'Playfair Display', body: 'Lora' },
        effects: { glassmorphism: true, particles: 'none', animations: 'fade', grain: true }
      }
    }
  },
  {
    id: 't5',
    name: 'Royal Invitation',
    description: 'Ultra-luxury cinematic invitation for elite celebrations.',
    category: 'Wedding',
    type: 'Invitation',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    manifest: {
      theme: {
        colors: { primary: '#d4af37', background: '#ffffff', text: '#1a1a1a', accent: '#f4f4f4', gradients: [] },
        typography: { heading: 'Cormorant Garamond', body: 'Inter' },
        effects: { glassmorphism: false, particles: 'gold-dust', animations: 'slide', grain: false }
      }
    }
  }
];
