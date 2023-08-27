import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { EventRepository } from 'src/common/repositories/event.repository';
import { Event } from 'src/common/schemas/event';

@Injectable()
export class SearchEventService {
  constructor(private readonly eventDB: EventRepository) {}

  async searchEventsByFilters(filters: any): Promise<Event[]> {
    const result = this.eventDB.findByFilters(filters);

    return result;
  }

  async validateCityName(cityName: string): Promise<boolean> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=(cities)&key=${apiKey}`;

    try {
      const res = await axios.get(apiUrl);

      if (res.data && res.data.predictions && res.data.predictions.length > 0) {
        return true;
      }

      return false;
    } catch (err) {
      throw new BadRequestException('Invalid city name');
    }
  }
}
