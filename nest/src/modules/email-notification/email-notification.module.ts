import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailNotificationSchema } from '../../common/schemas/email-notification';
import { EmailNotificationController } from './email-notification.controller';
import { EmailNotificationService } from './email-notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EmailNotification', schema: EmailNotificationSchema },
    ]),
  ],
  controllers: [EmailNotificationController],
  providers: [EmailNotificationService],
  exports: [EmailNotificationService],
})
export class EmailNotificationModule {}
