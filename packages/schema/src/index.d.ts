import { z } from 'zod';
export declare const ThemeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    colors: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        background: z.ZodString;
        text: z.ZodString;
        accent: z.ZodString;
        muted: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
        accent?: string;
        muted?: string;
    }, {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
        accent?: string;
        muted?: string;
    }>;
    gradients: z.ZodObject<{
        primary: z.ZodString;
        background: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        primary?: string;
        background?: string;
    }, {
        primary?: string;
        background?: string;
    }>;
    effects: z.ZodObject<{
        glow: z.ZodBoolean;
        particles: z.ZodEnum<["none", "stars", "hearts", "bubbles", "snow"]>;
        glassmorphism: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        glow?: boolean;
        particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
        glassmorphism?: boolean;
    }, {
        glow?: boolean;
        particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
        glassmorphism?: boolean;
    }>;
    typography: z.ZodObject<{
        heading: z.ZodString;
        body: z.ZodString;
        sizeMultiplier: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        heading?: string;
        body?: string;
        sizeMultiplier?: number;
    }, {
        heading?: string;
        body?: string;
        sizeMultiplier?: number;
    }>;
    spacing: z.ZodObject<{
        base: z.ZodDefault<z.ZodNumber>;
        sectionGap: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        base?: number;
        sectionGap?: string;
    }, {
        base?: number;
        sectionGap?: string;
    }>;
    animations: z.ZodObject<{
        mood: z.ZodEnum<["calm", "energetic", "romantic", "melancholic", "cinematic"]>;
        intensity: z.ZodNumber;
        transitionSpeed: z.ZodEnum<["slow", "normal", "fast"]>;
    }, "strip", z.ZodTypeAny, {
        mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
        intensity?: number;
        transitionSpeed?: "slow" | "normal" | "fast";
    }, {
        mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
        intensity?: number;
        transitionSpeed?: "slow" | "normal" | "fast";
    }>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    colors?: {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
        accent?: string;
        muted?: string;
    };
    gradients?: {
        primary?: string;
        background?: string;
    };
    effects?: {
        glow?: boolean;
        particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
        glassmorphism?: boolean;
    };
    typography?: {
        heading?: string;
        body?: string;
        sizeMultiplier?: number;
    };
    spacing?: {
        base?: number;
        sectionGap?: string;
    };
    animations?: {
        mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
        intensity?: number;
        transitionSpeed?: "slow" | "normal" | "fast";
    };
}, {
    id?: string;
    name?: string;
    colors?: {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
        accent?: string;
        muted?: string;
    };
    gradients?: {
        primary?: string;
        background?: string;
    };
    effects?: {
        glow?: boolean;
        particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
        glassmorphism?: boolean;
    };
    typography?: {
        heading?: string;
        body?: string;
        sizeMultiplier?: number;
    };
    spacing?: {
        base?: number;
        sectionGap?: string;
    };
    animations?: {
        mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
        intensity?: number;
        transitionSpeed?: "slow" | "normal" | "fast";
    };
}>;
export declare const SectionSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodRecord<z.ZodString, z.ZodAny>;
    intensity: z.ZodDefault<z.ZodNumber>;
    pacing: z.ZodDefault<z.ZodEnum<["slow", "normal", "fast"]>>;
    animationVariant: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    type?: string;
    intensity?: number;
    title?: string;
    content?: Record<string, any>;
    pacing?: "slow" | "normal" | "fast";
    animationVariant?: string;
}, {
    id?: string;
    type?: string;
    intensity?: number;
    title?: string;
    content?: Record<string, any>;
    pacing?: "slow" | "normal" | "fast";
    animationVariant?: string;
}>;
export declare const TemplateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    sections: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        defaultContent: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type?: string;
        defaultContent?: Record<string, any>;
    }, {
        type?: string;
        defaultContent?: Record<string, any>;
    }>, "many">;
    themeOverride: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        colors: z.ZodOptional<z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            background: z.ZodString;
            text: z.ZodString;
            accent: z.ZodString;
            muted: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        }, {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        }>>;
        gradients: z.ZodOptional<z.ZodObject<{
            primary: z.ZodString;
            background: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary?: string;
            background?: string;
        }, {
            primary?: string;
            background?: string;
        }>>;
        effects: z.ZodOptional<z.ZodObject<{
            glow: z.ZodBoolean;
            particles: z.ZodEnum<["none", "stars", "hearts", "bubbles", "snow"]>;
            glassmorphism: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        }, {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        }>>;
        typography: z.ZodOptional<z.ZodObject<{
            heading: z.ZodString;
            body: z.ZodString;
            sizeMultiplier: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        }, {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        }>>;
        spacing: z.ZodOptional<z.ZodObject<{
            base: z.ZodDefault<z.ZodNumber>;
            sectionGap: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            base?: number;
            sectionGap?: string;
        }, {
            base?: number;
            sectionGap?: string;
        }>>;
        animations: z.ZodOptional<z.ZodObject<{
            mood: z.ZodEnum<["calm", "energetic", "romantic", "melancholic", "cinematic"]>;
            intensity: z.ZodNumber;
            transitionSpeed: z.ZodEnum<["slow", "normal", "fast"]>;
        }, "strip", z.ZodTypeAny, {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        }, {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        }>>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    }, {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    name?: string;
    description?: string;
    sections?: {
        type?: string;
        defaultContent?: Record<string, any>;
    }[];
    themeOverride?: {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    };
}, {
    id?: string;
    name?: string;
    description?: string;
    sections?: {
        type?: string;
        defaultContent?: Record<string, any>;
    }[];
    themeOverride?: {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    };
}>;
export declare const WebsiteManifestSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    templateId: z.ZodOptional<z.ZodString>;
    emotionalTone: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        vibe: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary?: string;
        secondary?: string;
        vibe?: string;
    }, {
        primary?: string;
        secondary?: string;
        vibe?: string;
    }>;
    theme: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        colors: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            background: z.ZodString;
            text: z.ZodString;
            accent: z.ZodString;
            muted: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        }, {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        }>;
        gradients: z.ZodObject<{
            primary: z.ZodString;
            background: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary?: string;
            background?: string;
        }, {
            primary?: string;
            background?: string;
        }>;
        effects: z.ZodObject<{
            glow: z.ZodBoolean;
            particles: z.ZodEnum<["none", "stars", "hearts", "bubbles", "snow"]>;
            glassmorphism: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        }, {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        }>;
        typography: z.ZodObject<{
            heading: z.ZodString;
            body: z.ZodString;
            sizeMultiplier: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        }, {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        }>;
        spacing: z.ZodObject<{
            base: z.ZodDefault<z.ZodNumber>;
            sectionGap: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            base?: number;
            sectionGap?: string;
        }, {
            base?: number;
            sectionGap?: string;
        }>;
        animations: z.ZodObject<{
            mood: z.ZodEnum<["calm", "energetic", "romantic", "melancholic", "cinematic"]>;
            intensity: z.ZodNumber;
            transitionSpeed: z.ZodEnum<["slow", "normal", "fast"]>;
        }, "strip", z.ZodTypeAny, {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        }, {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        }>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    }, {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    }>;
    sections: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        content: z.ZodRecord<z.ZodString, z.ZodAny>;
        intensity: z.ZodDefault<z.ZodNumber>;
        pacing: z.ZodDefault<z.ZodEnum<["slow", "normal", "fast"]>>;
        animationVariant: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        type?: string;
        intensity?: number;
        title?: string;
        content?: Record<string, any>;
        pacing?: "slow" | "normal" | "fast";
        animationVariant?: string;
    }, {
        id?: string;
        type?: string;
        intensity?: number;
        title?: string;
        content?: Record<string, any>;
        pacing?: "slow" | "normal" | "fast";
        animationVariant?: string;
    }>, "many">;
    metadata: z.ZodObject<{
        musicMood: z.ZodOptional<z.ZodString>;
        fontPairing: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        musicMood?: string;
        fontPairing?: string;
    }, {
        musicMood?: string;
        fontPairing?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    title?: string;
    description?: string;
    sections?: {
        id?: string;
        type?: string;
        intensity?: number;
        title?: string;
        content?: Record<string, any>;
        pacing?: "slow" | "normal" | "fast";
        animationVariant?: string;
    }[];
    templateId?: string;
    emotionalTone?: {
        primary?: string;
        secondary?: string;
        vibe?: string;
    };
    theme?: {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    };
    metadata?: {
        musicMood?: string;
        fontPairing?: string;
    };
}, {
    id?: string;
    title?: string;
    description?: string;
    sections?: {
        id?: string;
        type?: string;
        intensity?: number;
        title?: string;
        content?: Record<string, any>;
        pacing?: "slow" | "normal" | "fast";
        animationVariant?: string;
    }[];
    templateId?: string;
    emotionalTone?: {
        primary?: string;
        secondary?: string;
        vibe?: string;
    };
    theme?: {
        id?: string;
        name?: string;
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
            accent?: string;
            muted?: string;
        };
        gradients?: {
            primary?: string;
            background?: string;
        };
        effects?: {
            glow?: boolean;
            particles?: "none" | "stars" | "hearts" | "bubbles" | "snow";
            glassmorphism?: boolean;
        };
        typography?: {
            heading?: string;
            body?: string;
            sizeMultiplier?: number;
        };
        spacing?: {
            base?: number;
            sectionGap?: string;
        };
        animations?: {
            mood?: "calm" | "energetic" | "romantic" | "melancholic" | "cinematic";
            intensity?: number;
            transitionSpeed?: "slow" | "normal" | "fast";
        };
    };
    metadata?: {
        musicMood?: string;
        fontPairing?: string;
    };
}>;
export type Template = z.infer<typeof TemplateSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type WebsiteManifest = z.infer<typeof WebsiteManifestSchema>;
