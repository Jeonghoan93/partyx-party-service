import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfig } from 'src/config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { EmailNotificationModule } from './modules/email-notification/email-notification.module';
import { EventModule } from './modules/event/event.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SearchModule } from './modules/search/search.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    EventModule,
    SearchModule,
    StripeModule,
    AuthModule,
    UserModule,
    PaymentModule,
    EmailNotificationModule,
    BookingModule,
  ],
})
export class AppModule {}
