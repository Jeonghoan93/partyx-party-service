import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { UserRepository } from 'src/common/repositories/user.repository';
import { Events, EventSchema } from 'src/common/schemas/events';
import { Users, UserSchema } from 'src/common/schemas/users';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Events.name, schema: EventSchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, UserRepository],
  exports: [EventService],
})
export class EventModule {}
