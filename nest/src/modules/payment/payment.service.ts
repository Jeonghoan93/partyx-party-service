import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImmediatePaymentDto, SchedulePaymentDto } from './dto/payment.dto';

type Payment = {
  id: number;
  eventId: string;
  userId: string;
  amount: number;
  paymentMethod: 'immediate' | 'scheduled' | 'installment';
  status: 'pending' | 'completed' | 'failed';
};

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];
  private idCounter = 0;

  schedulePayment(paymentDto: SchedulePaymentDto) {
    if (paymentDto.scheduledDate < new Date()) {
      throw new Error('Scheduled date must be in the future');
    }

    if (paymentDto.amount <= 0) {
      throw new BadRequestException('Invalid payment amount.');
    }

    const payment: Payment = {
      id: this.idCounter++,
      eventId: paymentDto.eventId,
      userId: paymentDto.userId,
      amount: paymentDto.amount,
      paymentMethod: 'scheduled',
      status: 'pending',
    };

    this.payments.push(payment);

    // In a real application, this would save the schedule in the database.
    return { success: true, id: this.payments.length };
  }

  makeImmediatePayment(paymentDto: ImmediatePaymentDto) {
    if (paymentDto.amount <= 0) {
      throw new BadRequestException('Invalid payment amount.');
    }

    const payment: Payment = {
      id: this.idCounter++,
      eventId: paymentDto.eventId,
      userId: paymentDto.userId,
      amount: paymentDto.amount,
      paymentMethod: 'immediate',
      status: 'pending',
    };

    this.payments.push(payment);
    // This would interact with an external payment gateway API.
    return { success: true, id: payment.id };
  }

  getPaymentById(id: number) {
    const payment = this.payments[id - 1];

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  // Add any additional methods or business logic here.
}
