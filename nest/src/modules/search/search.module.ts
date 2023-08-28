import { Module } from '@nestjs/common';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service';
import { SearchEventService } from './search-event.service';
import { SearchController } from './search.controller';

@Module({
  imports: [EventModule],
  controllers: [SearchController],
  providers: [SearchEventService, EventService],
})
export class SearchModule {}
