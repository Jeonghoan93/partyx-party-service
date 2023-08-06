import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { SearchModule } from './search/search.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    EventModule,
    SearchModule,
    StripeModule,
    AuthModule,
  ],
})
export class AppModule {}
