import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { UserRepository } from 'src/common/repositories/user.repository';
import { Event, EventSchema } from 'src/common/schemas/events';
import { UserSchema, Users } from 'src/common/schemas/users';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, UserRepository],
  exports: [EventService],
})
export class EventModule {}
