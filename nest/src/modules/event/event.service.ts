import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { Event } from 'src/common/schemas/event';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EventRepository)
    private readonly eventDB: EventRepository,
  ) {}

  async getEventsByEventTypes(eventTypes: string[]): Promise<Event[]> {
    return this.eventDB.findMany({ type: { $in: eventTypes } });
  }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventDB.findAll();

    return events;
  }

  async getEventById(eventId: string): Promise<Event> {
    if (!Types.ObjectId.isValid(eventId)) {
      throw new NotFoundException(`Event with eventId ${eventId} not found`);
    }

    const event = await this.eventDB.findOne({
      _id: new Types.ObjectId(eventId),
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const newEvent = await this.eventDB.create(dto);

    return newEvent;
  }

  async update(eventId: string, dto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventDB.update(
      {
        _id: new Types.ObjectId(eventId),
      },
      dto,
    );

    if (!updatedEvent) {
      throw new NotFoundException(`Event with eventId ${eventId} not found`);
    }

    return updatedEvent;
  }

  async deleteOneById(eventId: string): Promise<void> {
    const deletedEvent = await this.eventDB.delete({
      _id: new Types.ObjectId(eventId),
    });

    if (!deletedEvent) {
      throw new NotFoundException(`Event with eventId ${eventId} not found`);
    }
  }
}
