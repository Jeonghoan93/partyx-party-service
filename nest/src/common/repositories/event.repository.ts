import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/common/schemas/event';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findOne(query: any) {
    return this.eventModel.findOne(query);
  }

  async updateById(eventId: string, eventData: any): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, eventData, {
        new: true,
      })
      .exec();
  }

  async deleteById(eventId: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(eventId).exec();
  }

  async create(eventData: any): Promise<Event> {
    const newEvent = new this.eventModel(eventData);

    return newEvent.save();
  }

  async findAll() {
    return this.eventModel.find();
  }

  async findByFilters(filters: any): Promise<Event[]> {
    return this.eventModel.find(filters).sort({ createdAt: -1 }).exec();
  }
}
