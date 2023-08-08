import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailNotificationModule } from './email-notification/email-notification.module';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { SearchModule } from './search/search.module';
import { StripeModule } from './stripe/stripe.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    EventModule,
    SearchModule,
    StripeModule,
    AuthModule,
    UserModule,
    PaymentModule,
    EmailNotificationModule,
  ],
})
export class AppModule {}
