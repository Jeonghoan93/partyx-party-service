import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../event/schemas/event.schema';
import { SearchEventService } from './search-event.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchEventService],
})
export class SearchModule {}
