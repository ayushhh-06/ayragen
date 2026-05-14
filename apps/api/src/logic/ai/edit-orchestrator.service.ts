import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebsiteManifest } from '@auragen/schema';

import OpenAI from 'openai';

@Injectable()
export class AIEditOrchestrator {
  private readonly logger = new Logger(AIEditOrchestrator.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  /**
   * Processes a natural language edit request and updates an existing manifest.
   */
  async processEditRequest(
    currentManifest: WebsiteManifest, 
    editRequest: string
  ): Promise<WebsiteManifest> {
    this.logger.log(`Processing AI edit request: "${editRequest}"`);

    const systemPrompt = `
      You are the "AuraGen Design Editor". You will be given a Website Manifest (JSON) and a user's edit request.
      Your goal is to modify the manifest to fulfill the request while maintaining structural integrity.
      
      TYPES OF EDITS:
      - Theme: Update colors, particles, or typography.
      - Content: Rewrite text in sections.
      - Animations: Adjust mood or intensity.
      - Sections: Add, remove, or reorder sections.
      
      Return ONLY the updated JSON manifest.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `CURRENT MANIFEST: ${JSON.stringify(currentManifest)}\n\nEDIT REQUEST: ${editRequest}` },
        ],
        response_format: { type: 'json_object' },
      });

      const updatedManifest = JSON.parse(response.choices[0].message?.content || '{}');
      
      // Basic validation: Ensure it still looks like a manifest
      if (!updatedManifest.id || !updatedManifest.sections) {
        throw new Error('AI returned an invalid manifest structure');
      }

      return updatedManifest;

    } catch (error) {
      this.logger.error(`AI Edit failed: ${error.message}`);
      throw error;
    }
  }
}
