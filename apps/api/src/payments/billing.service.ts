import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Razorpay = require('razorpay');
import * as crypto from 'crypto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BillingService {
  private razorpay: any;
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');

    if (keyId && keySecret) {
      this.razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
      this.logger.log('💳 Razorpay initialized successfully.');
    } else {
      this.logger.warn('⚠️ Razorpay keys missing. Payment features will be disabled.');
    }
  }

  async createOrder(userId: string, plan: 'pro' | 'premium' | 'architect', websiteId?: string) {
    let priceInINR = 0;
    
    if (plan === 'architect') priceInINR = 199;
    else if (plan === 'pro') priceInINR = 1499;
    else if (plan === 'premium') priceInINR = 3999;

    const options = {
      amount: priceInINR * 100, // Amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
      notes: {
        userId,
        plan,
        websiteId: websiteId || '',
      },
    };

    const order = await this.razorpay.orders.create(options);
    return order;
  }

  async verifyPayment(userId: string, data: { orderId: string; paymentId: string; signature: string; plan: string }) {
    const { orderId, paymentId, signature, plan } = data;
    
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', this.configService.get<string>('RAZORPAY_KEY_SECRET') || '')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      this.logger.log(`Payment successful for user ${userId}, plan ${plan}`);

      // Update or create subscription
      const existing = await this.prisma.subscription.findFirst({
        where: { userId: userId }
      });

      if (existing) {
        await this.prisma.subscription.update({
          where: { id: existing.id },
          data: { planId: plan, status: 'ACTIVE' }
        });
      } else {
        await this.prisma.subscription.create({
          data: { userId, planId: plan, status: 'ACTIVE' }
        });
      }
      return { success: true };
    } else {
      throw new Error('Invalid signature');
    }
  }

  async handleWebhook(sig: string, body: any) {
    const secret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET');
    const expectedSignature = crypto
      .createHmac('sha256', secret || '')
      .update(JSON.stringify(body))
      .digest('hex');

    if (expectedSignature === sig) {
      const event = body.event;
      if (event === 'payment.captured') {
        // Handle post-payment logic if needed
      }
      return { status: 'ok' };
    }
    return { status: 'error' };
  }

  async processSuccessfulPayment(orderId: string, paymentId: string) {
    this.logger.log(`Processing successful payment for order ${orderId}`);
    
    try {
      const order = await this.razorpay.orders.fetch(orderId);
      const { userId, plan, websiteId } = order.notes;

      // Handle Per-Project Payment (Architect)
      if (websiteId) {
        await this.prisma.generatedWebsite.update({
          where: { id: websiteId },
          data: { 
            plan: plan.toUpperCase(), 
            paymentStatus: 'PAID' 
          }
        });
        this.logger.log(`[SUCCESS] Project ${websiteId} upgraded to ${plan}`);
      } else {
        // Handle Subscription Payment
        const existing = await this.prisma.subscription.findFirst({
          where: { userId: userId }
        });

        if (existing) {
          await this.prisma.subscription.update({
            where: { id: existing.id },
            data: { planId: plan, status: 'ACTIVE' }
          });
        } else {
          await this.prisma.subscription.create({
            data: { userId, planId: plan, status: 'ACTIVE' }
          });
        }
        this.logger.log(`[SUCCESS] Subscription activated for user ${userId} on plan ${plan}`);
      }
    } catch (error) {
      this.logger.error(`Failed to process payment for order ${orderId}: ${error.message}`);
    }
  }
}
