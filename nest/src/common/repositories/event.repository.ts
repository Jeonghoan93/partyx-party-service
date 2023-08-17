import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events } from 'src/common/schemas/events';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Events.name) private readonly eventModel: Model<Events>,
  ) {}

  async findOne(query: any) {
    return await this.eventModel.findOne(query);
  }

  async findMany(query: any) {
    return await this.eventModel.find(query);
  }

  async updateOne(query: any, data: any) {
    return await this.eventModel.updateOne(query, data);
  }

  async create(data: Record<string, any>) {
    return await this.eventModel.create(data);
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async deleteOne(query: any) {
    return await this.eventModel.deleteOne(query);
  }
}
