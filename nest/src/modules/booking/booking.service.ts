import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';

import { Booking } from './interfaces/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async createBooking(dto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(dto);
    return createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().populate('user').populate('event').exec();
  }
}
