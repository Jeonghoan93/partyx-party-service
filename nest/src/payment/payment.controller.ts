import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImmediatePaymentDto, SchedulePaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/schedule')
  schedulePayment(@Body() paymentDto: SchedulePaymentDto) {
    return this.paymentService.schedulePayment(paymentDto);
  }

  @Post('/immediate')
  makeImmediatePayment(@Body() paymentDto: ImmediatePaymentDto) {
    return this.paymentService.makeImmediatePayment(paymentDto);
  }

  @Get('/:id')
  getPayment(@Param('id') id: number) {
    return this.paymentService.getPaymentById(id);
  }

  // Define any additional routes or logic here.
}
