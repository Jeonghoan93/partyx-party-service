import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from 'src/common/repositories/event.respository';

@Injectable()
export class SearchEventService {
  constructor(
    @Inject(EventRepository) private readonly eventDB: EventRepository,
  ) {}

  async searchEventsByCity(city: string): Promise<any> {
    return this.eventDB.findMany({
      city: { $regex: new RegExp(city, 'i') },
    });
  }
}
