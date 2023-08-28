import { Injectable } from '@nestjs/common';
import { Event } from 'src/common/schemas/event';
import { EventService } from '../event/event.service';

@Injectable()
export class SearchEventService {
  constructor(private readonly service: EventService) {}

  async countByEventTypes(
    eventTypes: string[],
  ): Promise<{ events: Event[]; count: number }[]> {
    const events = await this.service.getEventsByEventTypes(eventTypes);

    const count = events.length;

    return [{ events: events, count: count }];
  }
}
