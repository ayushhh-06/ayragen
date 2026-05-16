import { Controller, Post, Body, Headers, Logger, BadRequestException, RawBodyRequest, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BillingService } from './billing.service';
import * as crypto from 'crypto';

@Controller('billing/webhooks')
export class BillingWebhookController {
  private readonly logger = new Logger(BillingWebhookController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly billingService: BillingService,
  ) {}

  @Post('razorpay')
  async handleRazorpayWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const webhookSecret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET');
    
    if (!signature || !webhookSecret) {
      this.logger.error('Missing signature or webhook secret');
      throw new BadRequestException('Invalid webhook request');
    }

    // Verify signature
    const body = (req as any).rawBody.toString();
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      this.logger.error('Invalid Razorpay signature');
      throw new BadRequestException('Signature mismatch');
    }

    const event = JSON.parse(body);
    this.logger.log(`[PAYMENT] Received Razorpay event: ${event.event}`);

    // Handle specific events
    if (event.event === 'payment.captured') {
      const { notes, amount, id: paymentId } = event.payload.payment.entity;
      const { order_id: orderId } = event.payload.payment.entity;
      
      this.logger.log(`[PAYMENT] Payment captured for order ${orderId}`);
      
      // The notes should contain the userId and plan from the order creation
      // But if not, we can use the orderId to find the user in our DB
      // We'll update the subscription status
      await this.billingService.processSuccessfulPayment(orderId, paymentId);
    }

    return { status: 'ok' };
  }
}
