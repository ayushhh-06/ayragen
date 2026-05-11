import { z } from 'zod';

export const EmotionalToneSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  vibe: z.string(), // cinematic, ethereal, brutalist, noir, etc.
  energy: z.number().optional(), // 0-1
});

export type EmotionalTone = z.infer<typeof EmotionalToneSchema>;

export const ThemeSchema = z.object({
  colors: z.object({
    primary: z.string(),
    background: z.string(),
    text: z.string(),
    accent: z.string(),
    glass: z.string().optional(),
    gradients: z.array(z.string()).optional(),
  }),
  typography: z.object({
    heading: z.string(),
    body: z.string(),
    sizeScale: z.number().optional(),
  }),
  effects: z.object({
    glassmorphism: z.boolean().default(true),
    particles: z.string().optional(), // snow, stars, floating, none
    animations: z.string().default('smooth'), // fluid, snappy, dramatic
    grain: z.boolean().default(false),
  }),
  spacing: z.string().optional(),
  borderRadius: z.string().optional(),
});

export type Theme = z.infer<typeof ThemeSchema>;

export const SectionTypeSchema = z.enum([
  'hero',
  'navbar',
  'features',
  'pricing',
  'testimonials',
  'cta',
  'faq',
  'footer',
  'gallery',
  'contact',
  'stats',
  'team',
  'blog-preview',
  'story-timeline',
  'cinematic-reveal',
  'mood-board',
]);

export type SectionType = z.infer<typeof SectionTypeSchema>;

export const WebsiteSectionSchema = z.object({
  id: z.string(),
  type: SectionTypeSchema,
  title: z.string(),
  content: z.record(z.any()),
  styles: z.record(z.string()).optional(),
  animations: z.object({
    entry: z.string().optional(),
    scroll: z.string().optional(),
  }).optional(),
  order: z.number(),
});

export type WebsiteSection = z.infer<typeof WebsiteSectionSchema>;
export type Section = WebsiteSection; // Alias for backward compatibility

export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  previewUrl: z.string().optional(),
});

export type Template = z.infer<typeof TemplateSchema>;

export const WebsiteManifestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  templateId: z.string().optional(),
  version: z.string().default('1.0.0'),
  emotionalTone: EmotionalToneSchema,
  theme: ThemeSchema,
  sections: z.array(WebsiteSectionSchema),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type WebsiteManifest = z.infer<typeof WebsiteManifestSchema>;
