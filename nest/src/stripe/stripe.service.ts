import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async createCharge(amount: number, source: string): Promise<Stripe.Charge> {
    return this.stripe.charges.create({
      amount: amount,
      currency: 'sek',
      source: source,
    });
  }

  async createRefund(
    chargeId: string,
    amount?: number,
  ): Promise<Stripe.Refund> {
    return this.stripe.refunds.create({
      charge: chargeId,
      amount: amount, // This can be optional, meaning refund the full amount
    });
  }

  async getRefund(refundId: string): Promise<Stripe.Refund> {
    return this.stripe.refunds.retrieve(refundId);
  }

  async listRefunds(): Promise<Stripe.ApiList<Stripe.Refund>> {
    return this.stripe.refunds.list();
  }

  async getTransactionHistory(userId: string): Promise<Stripe.Charge[]> {
    // You might need to adjust based on how you link charges to users in your Stripe account
    const chargesListResponse = await this.stripe.charges.list({
      customer: userId,
    });
    return chargesListResponse.data;
  }

  async listPaymentMethods(userId: string): Promise<Stripe.PaymentMethod[]> {
    const paymentMethodsListResponse = await this.stripe.paymentMethods.list({
      customer: userId,
      type: 'card',
    });
    return paymentMethodsListResponse.data;
  }

  async addPaymentMethod(
    userId: string,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentMethod> {
    // Attach a new payment method to the customer
    return this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: userId,
    });
  }

  async listInvoices(userId: string): Promise<Stripe.Invoice[]> {
    const invoicesListResponse = await this.stripe.invoices.list({
      customer: userId,
    });

    return invoicesListResponse.data;
  }
}
