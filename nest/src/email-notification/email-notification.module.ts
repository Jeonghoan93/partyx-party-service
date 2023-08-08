import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailNotificationController } from './email-notification.controller';
import { EmailNotificationService } from './email-notification.service';
import { EmailNotificationSchema } from './schemas/email-notification.schema';

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
