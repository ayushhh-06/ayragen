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
            content: `You are an Emotional Content Writer. Your goal is to write ${sectionType} content that is ${analysis.emotion} and fits a ${analysis.category} theme. Keep it concise, poetic, and cinematic.` 
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
    switch (type) {
      case 'ShayariSection':
        return 'Generate 4 lines of emotional shayari/poetry. Return JSON: { lines: string[], author: string }';
      case 'HeroSection':
        return 'Generate a grand heading and a subtext message. Return JSON: { title: string, copy: string }';
      case 'TimelineSection':
        return 'Generate 3 significant life events with titles and descriptions. Return JSON: { events: Array<{date: string, title: string, description: string}> }';
      case 'PopupNotes':
        return 'Generate 3 small, secret emotional notes. Return JSON: { notes: Array<{text: string, context: string}> }';
      case 'EndingReveal':
        return 'Generate a dramatic reveal message. Return JSON: { mainTitle: string, subText: string, triggerLabel: string }';
      default:
        return 'Generate generic content for this section. Return JSON: { title: string, content: any }';
    }
  }

  private getFallbackContent(type: string, analysis: AnalysisResult): any {
    // Basic fallbacks to ensure generation never stops
    if (type === 'ShayariSection') return { lines: ['In the silence of the night,', 'Your light shines ever bright.'], author: 'AuraGen' };
    if (type === 'HeroSection') return { title: `A Special ${analysis.category}`, copy: 'Created with love and memories.' };
    return { title: 'Welcome', copy: 'Enjoy this personalized experience.' };
  }
}
