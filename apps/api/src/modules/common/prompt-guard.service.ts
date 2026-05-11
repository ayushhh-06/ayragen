import { Injectable, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class PromptGuard {
  private readonly logger = new Logger(PromptGuard.name);

  // Simple blacklist for demonstration; in production, this would use AI moderation
  private readonly BLACKLIST = [
    'hack', 'exploit', 'sql injection', '<script>', 'password', 'token'
  ];

  /**
   * Audits a user prompt for spam, toxic content, or injection attempts.
   */
  validate(prompt: string) {
    this.logger.log(`Auditing prompt safety: "${prompt.slice(0, 20)}..."`);

    if (!prompt || prompt.length < 5) {
      throw new BadRequestException('Prompt is too short to be meaningful.');
    }

    if (prompt.length > 2000) {
      throw new BadRequestException('Prompt exceeds the safety length limit.');
    }

    const containsMalicious = this.BLACKLIST.some(term => 
      prompt.toLowerCase().includes(term)
    );

    if (containsMalicious) {
      this.logger.warn(`🛑 Blocked suspicious prompt: "${prompt}"`);
      throw new BadRequestException('Your prompt contains restricted or suspicious language.');
    }

    return true;
  }
}
