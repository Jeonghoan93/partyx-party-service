import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Reservation } from './reservation';
import { Users } from './users';

export class Location {
  @Prop({ type: String, default: 'Point', required: true })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  streetAddress: string;

  @Prop()
  country: string;
}

export class Host {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

export class Attendee {
  @Prop()
  userId: string;

  @Prop()
  RSVPStatus: string;
}

export class Entertainment {
  @Prop({ required: true })
  entertainerId: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

export class Supply {
  @Prop({ required: true })
  supplyId: string;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageSrc: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  maxOccupancy: number;

  @Prop({ required: true })
  minOccupancy: number;

  @Prop({ type: Location })
  location: Location;

  @Prop({ type: Host })
  host: Host;

  @Prop()
  theme?: string;

  @Prop({ type: [String] })
  music?: string[];

  @Prop({ type: [String] })
  eventImages?: string[];

  @Prop({ type: Object })
  attendees: Attendee[];

  @Prop({ type: Object })
  entertainment: Entertainment[];

  @Prop({ type: Object })
  supplies: Supply[];

  @Prop({ ref: 'User' })
  userId: string;

  createdAt: Date;

  user?: Users;
  reservations?: Reservation[];
}

export const EventSchema = SchemaFactory.createForClass(Event);