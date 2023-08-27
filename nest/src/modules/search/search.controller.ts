import { Controller, Get, Query } from '@nestjs/common';
import { SearchEventService } from './search-event.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchEventService: SearchEventService) {}

  @Get()
  async searchEventsByFilters(@Query() filters: any) {
    return await this.searchEventService.searchEventsByFilters(filters);
  }
}
