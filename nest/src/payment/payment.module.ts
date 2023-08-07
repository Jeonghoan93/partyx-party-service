import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [], // Later, you can import DB modules or other utility modules.
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService], // In case other modules require this service.
})
export class PaymentModule {}
