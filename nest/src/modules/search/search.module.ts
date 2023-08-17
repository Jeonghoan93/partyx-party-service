import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { EventSchema, Events } from 'src/common/schemas/events';
import { SearchEventService } from './search-event.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchEventService, EventRepository],
})
export class SearchModule {}
