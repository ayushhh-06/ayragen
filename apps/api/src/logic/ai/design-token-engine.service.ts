import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnalysisResult } from './prompt-analyzer.service';
import OpenAI from 'openai';

@Injectable()
export class DesignTokenEngine {
  private readonly logger = new Logger(DesignTokenEngine.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  /**
   * Generates a cohesive cinematic design system using AI.
   */
  async generateTokens(analysis: AnalysisResult) {
    this.logger.log(`[DESIGN] Engineering atmosphere for: ${analysis.vibe}`);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a High-End Cinematic UI Designer. Generate a detailed theme config for a website with a "${analysis.vibe}" vibe and "${analysis.emotion}" emotion.
            
            Return JSON in this format:
            {
              "colors": {
                "primary": "hex code",
                "background": "hex code (usually dark/deep for cinematic)",
                "text": "hex code",
                "accent": "hex code",
                "gradients": ["linear-gradient string"]
              },
              "typography": {
                "heading": "Font Name (Playfair Display, Outfit, Inter, etc.)",
                "body": "Font Name"
              },
              "effects": {
                "glassmorphism": boolean,
                "particles": "stars" | "snow" | "floating" | "none",
                "grain": boolean,
                "animations": "smooth" | "dramatic" | "snappy"
              }
            }`
          },
          { role: 'user', content: `Create a design system for: ${analysis.vibe} mood.` }
        ],
        response_format: { type: 'json_object' }
      });

      const tokens = JSON.parse(response.choices[0].message?.content || '{}');
      return tokens;
    } catch (error) {
      this.logger.warn(`AI Design Token generation failed. Falling back to hardcoded vibes.`);
      return this.getFallbackTokens(analysis.vibe);
    }
  }

  private getFallbackTokens(vibe: string) {
    const fallbacks: any = {
      cinematic: {
        colors: { primary: '#E50914', background: '#050505', text: '#FFFFFF', accent: '#FFD700', gradients: ['linear-gradient(135deg, #E50914, #000000)'] },
        typography: { heading: 'Playfair Display', body: 'Outfit' },
        effects: { glassmorphism: true, particles: 'stars', grain: true, animations: 'dramatic' }
      },
      ethereal: {
        colors: { primary: '#C084FC', background: '#0A0512', text: '#F5F3FF', accent: '#F9A8D4', gradients: ['linear-gradient(135deg, #C084FC, #F9A8D4)'] },
        typography: { heading: 'Outfit', body: 'Inter' },
        effects: { glassmorphism: true, particles: 'floating', grain: false, animations: 'smooth' }
      }
    };
    return fallbacks[vibe] || fallbacks.cinematic;
  }
}
