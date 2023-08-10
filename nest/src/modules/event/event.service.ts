import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from 'src/common/interfaces/event.interface';
import { User } from 'src/common/interfaces/user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
    //  return await this.eventModel.find().populate('host').exec();
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

  async create(userId: string, createEventDto: CreateEventDto): Promise<Event> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const createdEvent = new this.eventModel({
      ...createEventDto,
      host: userId,
    });

    const savedEvent = await createdEvent.save();

    user.eventsHosted.push(savedEvent._id);
    await user.save();

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
