import { Controller, Get, Query } from '@nestjs/common';
import { SearchEventService } from './search-event.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly service: SearchEventService) {}

  @Get('event-types')
  async countByEventTypes(@Query('eventTypes') eventType: string) {
    const eventTypesArray = eventType.split(',');

    return this.service.countByEventTypes(eventTypesArray);
  }
}
