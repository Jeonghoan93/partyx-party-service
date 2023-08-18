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

  findMany(query: any) {
    return this.eventModel.find(query);
  }

  updateOne(query: any, data: any) {
    return this.eventModel.updateOne(query, data);
  }

  create(data: Record<string, any>) {
    return this.eventModel.create(data);
  }

  findAll() {
    return this.eventModel.find();
  }

  deleteOne(query: any) {
    return this.eventModel.deleteOne(query);
  }
}
