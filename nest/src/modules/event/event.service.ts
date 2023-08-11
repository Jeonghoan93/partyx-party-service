import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from 'src/common/schema/event';
import { Users } from 'src/common/schema/users';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
    //  return await this.eventModel.find().populate('host').exec();
  }

  async findEventById(id: string): Promise<Event> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel({
      ...dto,
    });

    const savedEvent = await createdEvent.save();

    return savedEvent;
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

    await this.userModel.updateOne(
      { _id: deletedEvent.host },
      { $pull: { eventsHosted: deletedEvent._id } },
    );

    return deletedEvent;
  }
}
