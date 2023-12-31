import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Event } from './event';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Reservation extends Document {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true, ref: 'Listing' })
  listingId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  totalPrice: number;

  createdAt: Date;

  updatedAt: Date;

  event: Event;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
