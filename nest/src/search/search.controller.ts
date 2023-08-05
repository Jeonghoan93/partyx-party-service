import { Controller, Get, Query } from '@nestjs/common';
import { SearchEventService } from './search-event.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchEventService: SearchEventService) {}

  @Get('events')
  async searchEventsByCity(@Query('city') city: string) {
    return this.searchEventService.searchEventsByCity(city);
  }
}
