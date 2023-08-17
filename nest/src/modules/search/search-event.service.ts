import { Injectable } from '@nestjs/common';
import { EventRepository } from 'src/common/repositories/event.repository';

@Injectable()
export class SearchEventService {
  constructor(private readonly eventRepo: EventRepository) {}

  async searchEvents(filters: any) {
    const query = {};

    if (filters.priceMin || filters.priceMax) {
      query['price'] = {};
      if (filters.priceMin) query['price']['$gte'] = filters.priceMin;
      if (filters.priceMax) query['price']['$lte'] = filters.priceMax;
    }

    if (filters.startDate || filters.endDate) {
      query['date'] = {};
      if (filters.startDate)
        query['date']['$gte'] = new Date(filters.startDate);
      if (filters.endDate) query['date']['$lte'] = new Date(filters.endDate);
    }

    // More filters can be added in a similar way

    const events = await this.eventRepo.findMany(query);

    // Sorting & Pagination can be applied on the "events" as needed

    return events;
  }
}
