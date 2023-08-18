import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { Event, EventSchema } from 'src/common/schemas/event';
import { SearchEventService } from './search-event.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchEventService, EventRepository],
})
export class SearchModule {}
