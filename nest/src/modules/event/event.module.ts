import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event } from 'src/common/schema/event';
import { Users } from 'src/common/schema/users';
import { EventSchema } from '../../common/schema/event';
import { UserSchema } from '../../common/schema/users';
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
  providers: [EventService],
})
export class EventModule {}
