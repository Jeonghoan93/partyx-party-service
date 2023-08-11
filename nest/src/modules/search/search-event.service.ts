import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../common/interface/event';

@Injectable()
export class SearchEventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async searchEventsByCity(city: string): Promise<Event[]> {
    return this.eventModel.find({ 'location.city': city }).exec();
  }
}
