import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('api/stripe')
export class StripeController {
  constructor(
    private readonly paymentService: StripeService,
    private readonly logger: Logger,
  ) {}

  @Post('charge')
  async createCharge(@Body() paymentData: { amount: number; source: string }) {
    return this.paymentService.createCharge(
      paymentData.amount,
      paymentData.source,
    );
  }

  @Post('refund')
  async createRefund(
    @Body() refundData: { chargeId: string; amount?: number },
  ) {
    return this.paymentService.createRefund(
      refundData.chargeId,
      refundData.amount,
    );
  }

  @Get('refund/:id')
  async getRefund(@Param('id') refundId: string) {
    return this.paymentService.getRefund(refundId);
  }

  @Get('refunds')
  async listRefunds() {
    return this.paymentService.listRefunds();
  }

  @Get('history')
  async getTransactionHistory(@Req() request: any) {
    try {
      const userId = request.user.id; // Assuming you've set up user authentication and attached user to the request
      return this.paymentService.getTransactionHistory(userId);
    } catch (err) {
      this.logger.error('Error fetching payment history: ', err.stack);
      throw err;
    }
  }

  @Get('methods')
  async listPaymentMethods(@Req() request: any) {
    const userId = request.user.id;
    return this.paymentService.listPaymentMethods(userId);
  }

  @Post('methods')
  async addPaymentMethod(
    @Req() request: any,
    @Body() methodData: { paymentMethodId: string },
  ) {
    const userId = request.user.id;
    return this.paymentService.addPaymentMethod(
      userId,
      methodData.paymentMethodId,
    );
  }

  @Get('invoices')
  async listInvoices(@Req() request: any) {
    const userId = request.user.id;
    return this.paymentService.listInvoices(userId);
  }
}
