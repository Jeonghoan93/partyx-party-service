import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { Event } from 'src/common/schemas/events';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EventRepository) private readonly eventDB: EventRepository,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventDB.findAll();
    //  return await this.eventDB.find().populate('host')
  }

  async findEventById(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const event = await this.eventDB.findOne(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const newEvent = await this.eventDB.create(dto);

    await this.eventDB.updateOne(
      { _id: newEvent.host },
      { $push: { eventsHosted: newEvent._id } },
    );

    return newEvent;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<any> {
    const updatedEvent = await this.eventDB.updateOne(id, updateEventDto);

    if (!updatedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }

  async deleteOne(id: string): Promise<any> {
    const deletedEvent = await this.eventDB.deleteOne(id);

    if (!deletedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return deletedEvent;
  }
}
