import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnalysisResult } from './prompt-analyzer.service';
import OpenAI from 'openai';

@Injectable()
export class ContentSynthesizer {
  private readonly logger = new Logger(ContentSynthesizer.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  /**
   * Synthesizes specific, emotionally-aligned content for a website section.
   */
  async synthesizeSection(sectionType: string, analysis: AnalysisResult): Promise<any> {
    const prompt = this.getPromptForSection(sectionType, analysis);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { 
            role: 'system', 
            content: `You are a World-Class Emotional Storyteller and Cinematic Copywriter. Your goal is to write website content that is ${analysis.emotion} and fits a ${analysis.category} theme with a ${analysis.vibe} vibe. 
            
            Guidelines:
            - Avoid corporate jargon.
            - Use poetic, evocative language.
            - Keep it concise but impactful.
            - Use JSON as the output format.` 
          },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      });

      return JSON.parse(response.choices[0].message?.content || '{}');
    } catch (error) {
      this.logger.warn(`Failed to synthesize content for ${sectionType}. Using fallback.`);
      return this.getFallbackContent(sectionType, analysis);
    }
  }

  private getPromptForSection(type: string, analysis: AnalysisResult): string {
    switch (type.toLowerCase().replace('section', '')) {
      case 'hero':
        return 'Generate a dramatic heading and a poetic subtext. { "title": "string", "copy": "string" }';
      case 'features':
        return 'Generate 3 emotional features/highlights. { "title": "string", "subtitle": "string", "items": Array<{ "iconType": "performance"|"design"|"mobile"|"global", "title": "string", "description": "string" }> }';
      case 'pricing':
        return 'Generate 3 emotional pricing tiers. { "title": "string", "subtitle": "string", "tiers": Array<{ "name": "string", "price": number, "features": string[], "popular": boolean }> }';
      case 'testimonials':
        return 'Generate 3 poetic testimonials. { "title": "string", "items": Array<{ "quote": "string", "author": "string", "role": "string" }> }';
      case 'cta':
        return 'Generate a final emotional call to action. { "title": "string", "subtitle": "string", "buttonText": "string" }';
      case 'faq':
        return 'Generate 3 meaningful questions and answers. { "title": "string", "items": Array<{ "question": "string", "answer": "string" }> }';
      case 'gallery':
        return 'Generate titles for a museum-style gallery. { "title": "string", "subtitle": "string" }';
      case 'footer':
        return 'Generate footer links and copyright. { "copyright": "string", "links": Array<{ "label": "string", "href": "string" }> }';
      default:
        return 'Generate cinematic content for this section. { "title": "string", "copy": "string" }';
    }
  }

  private getFallbackContent(type: string, analysis: AnalysisResult): any {
    return { 
      title: `The ${analysis.emotion} ${type}`, 
      copy: 'A beautifully preserved moment in time.' 
    };
  }
}
