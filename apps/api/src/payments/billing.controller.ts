import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Request, 
  Headers, 
  Req,
  RawBodyRequest
} from '@nestjs/common';
import { JwtAuthGuard } from '../security/guards/jwt-auth.guard';
import { BillingService } from './billing.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('order')
  @ApiOperation({ summary: 'Create a Razorpay order' })
  async createOrder(@Body() dto: { plan: 'pro' | 'premium' }, @Request() req) {
    return this.billingService.createOrder(req.user.userId, dto.plan);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  @ApiOperation({ summary: 'Verify Razorpay payment signature' })
  async verifyPayment(@Body() dto: { orderId: string; paymentId: string; signature: string; plan: string }, @Request() req) {
    return this.billingService.verifyPayment(req.user.userId, dto);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle Razorpay webhooks' })
  async handleWebhook(
    @Headers('x-razorpay-signature') sig: string,
    @Body() body: any,
  ) {
    return this.billingService.handleWebhook(sig, body);
  }
}
