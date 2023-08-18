import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventRepository } from 'src/common/repositories/event.repository';
import { Event } from 'src/common/schemas/event';
import { AuthService } from '../auth/auth.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EventRepository)
    private readonly eventDB: EventRepository,
    private readonly authService: AuthService,
  ) {}

  async getEvents(params: any): Promise<Event[]> {
    const query: any = {
      ...params,
    };

    const events = await this.eventDB
      .findMany(query)
      .sort({ createdAt: -1 })
      .exec();

    return events;
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

  async getFavoriteEvents(req: any): Promise<Event[]> {
    const currentUser = await this.authService.getCurrentUser(req);

    if (!currentUser) {
      return [];
    }

    const favoriteEvents = await this.eventDB.findMany({
      id: { $in: currentUser.favoriteEvents },
    });

    return favoriteEvents;
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
