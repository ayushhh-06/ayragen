import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelemetryService } from '../common/telemetry.service';
import { z } from 'zod';

import OpenAI from 'openai';

// Define the schema for validation
const AnalysisSchema = z.object({
  category: z.enum(['birthday', 'anniversary', 'confession', 'memorial', 'celebration', 'apology']),
  title: z.string().optional(),
  emotion: z.string(),
  vibe: z.string(),
  theme: z.string(),
  animationStyle: z.enum(['smooth', 'snappy', 'slow', 'energetic']),
  typographyStyle: z.object({
    heading: z.string(),
    body: z.string(),
  }),
  sectionSelection: z.array(z.string()),
  musicMood: z.string(),
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;

@Injectable()
export class PromptAnalyzer {
  private readonly logger = new Logger(PromptAnalyzer.name);
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private telemetry: TelemetryService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({
      apiKey,
    });
  }

  private readonly SYSTEM_PROMPT = `
    You are the "AyraGen Emotional Architect". Your task is to analyze a user's emotional prompt and generate a technical design specification for a personalized website.
    
    You must output ONLY valid JSON.
    
    Rules for output:
    - CATEGORY: Detect the core intent.
    - EMOTION: The primary emotional tone.
    - VIBE: The visual atmosphere (e.g., cinematic, ethereal, neon).
    - SECTIONS: Select from [HeroSection, GallerySection, TimelineSection, ShayariSection, MusicPlayer, CountdownSection, PopupNotes, EndingReveal].
    - TYPOGRAPHY: Provide specific font names for Heading and Body.
  `;

  async analyze(prompt: string): Promise<AnalysisResult> {
    const label = `OpenAI_Analyze_${Date.now()}`;
    this.telemetry.startMeasure(label);
    try {
      this.logger.log(`Requesting AI analysis for prompt: "${prompt}"`);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: this.SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      });

      const usage = response.usage;
      if (usage) {
        this.logger.log(`[AI_METRICS] Prompt tokens: ${usage.prompt_tokens}, Completion tokens: ${usage.completion_tokens}, Total: ${usage.total_tokens}`);
      }

      const content = response.choices[0].message.content;
      if (!content) throw new Error('AI returned an empty response');

      const parsed = JSON.parse(content);
      
      // PRODUCTION VALIDATION: Ensure the AI actually followed the schema
      const validated = AnalysisSchema.parse(parsed);
      
      this.telemetry.endMeasure(label);
      
      // We'll return the validated result, but we could also attach usage here
      // if we want the orchestrator to track it per-user.
      return validated;

    } catch (error) {
      this.telemetry.endMeasure(label);
      this.logger.warn(`AI Analysis failed: ${error.message}. Triggering fallback logic.`);
      return this.fallbackAnalysis(prompt);
    }
  }

  /**
   * Fallback logic to ensure the system remains functional even if OpenAI is down.
   */
  private fallbackAnalysis(prompt: string): AnalysisResult {
    const lower = prompt.toLowerCase();
    
    if (lower.includes('birthday')) {
      return {
        category: 'birthday',
        emotion: 'joyful',
        vibe: 'cinematic',
        theme: 'vibrant-gold',
        animationStyle: 'energetic',
        sectionSelection: ['HeroSection', 'CountdownSection', 'GallerySection', 'EndingReveal'],
        typographyStyle: { heading: 'Outfit', body: 'Inter' },
        musicMood: 'upbeat-acoustic'
      };
    }

    return {
      category: 'celebration',
      emotion: 'sincere',
      vibe: 'minimalist',
      theme: 'clean-white',
      animationStyle: 'smooth',
      sectionSelection: ['HeroSection', 'GallerySection', 'MusicPlayer'],
      typographyStyle: { heading: 'Playfair Display', body: 'Lora' },
      musicMood: 'piano-ambient'
    };
  }
}
