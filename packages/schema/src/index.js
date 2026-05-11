"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteManifestSchema = exports.TemplateSchema = exports.SectionSchema = exports.ThemeSchema = void 0;
const zod_1 = require("zod");
exports.ThemeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    colors: zod_1.z.object({
        primary: zod_1.z.string(),
        secondary: zod_1.z.string(),
        background: zod_1.z.string(),
        text: zod_1.z.string(),
        accent: zod_1.z.string(),
        muted: zod_1.z.string().optional(),
    }),
    gradients: zod_1.z.object({
        primary: zod_1.z.string(),
        background: zod_1.z.string().optional(),
    }),
    effects: zod_1.z.object({
        glow: zod_1.z.boolean(),
        particles: zod_1.z.enum(['none', 'stars', 'hearts', 'bubbles', 'snow']),
        glassmorphism: zod_1.z.boolean(),
    }),
    typography: zod_1.z.object({
        heading: zod_1.z.string(),
        body: zod_1.z.string(),
        sizeMultiplier: zod_1.z.number().default(1),
    }),
    spacing: zod_1.z.object({
        base: zod_1.z.number().default(4),
        sectionGap: zod_1.z.string().default('8rem'),
    }),
    animations: zod_1.z.object({
        mood: zod_1.z.enum(['calm', 'energetic', 'romantic', 'melancholic', 'cinematic']),
        intensity: zod_1.z.number().min(0).max(1),
        transitionSpeed: zod_1.z.enum(['slow', 'normal', 'fast']),
    }),
});
exports.SectionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.record(zod_1.z.any()),
    intensity: zod_1.z.number().default(0.5),
    pacing: zod_1.z.enum(['slow', 'normal', 'fast']).default('normal'),
    animationVariant: zod_1.z.string().optional(),
});
exports.TemplateSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    sections: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string(),
        defaultContent: zod_1.z.record(zod_1.z.any()),
    })),
    themeOverride: exports.ThemeSchema.partial().optional(),
});
exports.WebsiteManifestSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    templateId: zod_1.z.string().optional(),
    emotionalTone: zod_1.z.object({
        primary: zod_1.z.string(),
        secondary: zod_1.z.string(),
        vibe: zod_1.z.string(),
    }),
    theme: exports.ThemeSchema,
    sections: zod_1.z.array(exports.SectionSchema),
    metadata: zod_1.z.object({
        musicMood: zod_1.z.string().optional(),
        fontPairing: zod_1.z.string(),
    }),
});
//# sourceMappingURL=index.js.map