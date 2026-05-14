import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log('📧 MailService initialized with Resend.');
    } else {
      this.logger.warn('⚠️ RESEND_API_KEY missing. Email features will not work.');
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    if (!this.resend) return;

    const resetUrl = `${this.configService.get<string>('FRONTEND_URL') || 'https://ayragen-web.vercel.app'}/auth/reset-password?token=${token}`;

    try {
      await this.resend.emails.send({
        from: 'AyraGen <onboarding@resend.dev>',
        to: email,
        subject: 'Reset Your AyraGen Password',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: white; padding: 40px; border-radius: 20px;">
            <h2 style="color: #c084fc;">AyraGen Studio</h2>
            <p>You requested a password reset for your cinematic studio account.</p>
            <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: white; color: black; text-decoration: none; border-radius: 12px; font-weight: bold; margin: 20px 0;">Reset Password</a>
            <p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}: ${error.message}`);
    }
  }
}
