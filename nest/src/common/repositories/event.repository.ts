import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Event } from 'src/common/schemas/event';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async findOne(query: FilterQuery<Event>): Promise<Event | null> {
    return this.eventModel.findOne(query);
  }

  async findMany(query: FilterQuery<Event>): Promise<Event[]> {
    return this.eventModel.find(query).exec();
  }

  async update(query: FilterQuery<Event>, data: any): Promise<Event> {
    return this.eventModel
      .findOneAndUpdate(query, data, {
        new: true,
      })
      .exec();
  }

  async delete(query: FilterQuery<Event>): Promise<Event> {
    return this.eventModel.findByIdAndDelete(query).exec();
  }

  async create(data: any): Promise<Event> {
    const newEvent = new this.eventModel(data);

    return newEvent.save();
  }

  async findAll() {
    return this.eventModel.find();
  }
}
