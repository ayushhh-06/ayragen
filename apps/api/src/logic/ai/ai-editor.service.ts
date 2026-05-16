import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebsiteManifest } from '@ayragen/schema';
import OpenAI from 'openai';

@Injectable()
export class AIEditorService {
  private readonly logger = new Logger(AIEditorService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async editManifest(manifest: WebsiteManifest, instruction: string): Promise<WebsiteManifest> {
    this.logger.log(`AI Editor received instruction: "${instruction}"`);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Using the latest model for better reasoning
        messages: [
          {
            role: 'system',
            content: `You are the Lead Creative Director of AyraGen. Your job is to modify the provided Website Manifest (JSON) based on user instructions. 
            
            Return ONLY the modified JSON manifest. Do not include any explanation.
            
            Key Principles:
            - Maintain the cinematic, high-end emotional vibe.
            - If the user asks for design changes, update theme.colors, theme.typography, or theme.effects.
            - If the user asks for content changes, update the relevant section's content.
            - If the user asks for a new section, add it to the sections array with an appropriate order.
            - Ensure the manifest remains valid according to the schema.`
          },
          {
            role: 'user',
            content: `Current Manifest: ${JSON.stringify(manifest)}\n\nInstruction: ${instruction}`
          }
        ],
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message?.content || '{}';
      const modifiedManifest = JSON.parse(content);

      this.logger.log('AI Manifest modification successful');
      return modifiedManifest;
    } catch (error) {
      this.logger.error(`AI Manifest modification failed: ${error.message}`);
      throw error;
    }
  }
}
