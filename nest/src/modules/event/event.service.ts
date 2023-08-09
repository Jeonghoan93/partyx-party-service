import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../../common/interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
  }

  async getById(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return await createdEvent.save();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      updateEventDto,
      { new: true },
    );

    if (!updatedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }

  async delete(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id);

    if (!deletedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return deletedEvent;
  }
}
