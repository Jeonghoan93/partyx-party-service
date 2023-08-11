import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../../common/schema/event';
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
