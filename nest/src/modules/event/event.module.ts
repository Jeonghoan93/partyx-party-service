import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { UserRepository } from 'src/common/repositories/user.repository';
import { Event, EventSchema } from 'src/common/schemas/event';
import { User, UserSchema } from 'src/common/schemas/user';
import { AuthModule } from '../auth/auth.module';
import { EventController } from './event.controller';
import { EventGateway } from './event.gateway';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, UserRepository, EventGateway],
  exports: [EventService, EventRepository],
})
export class EventModule {}
