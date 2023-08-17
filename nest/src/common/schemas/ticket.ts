import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TicketStatus {
  PURCHASED = 'purchased',
  RESERVED = 'reserved',
  CANCELED = 'canceled',
}

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true, ref: 'Users' })
  userId: string;

  @Prop({ required: true, ref: 'Event' })
  eventId: string;

  @Prop({ required: true })
  ticketNumber: string;

  @Prop({ enum: TicketStatus, default: TicketStatus.RESERVED })
  status: string;

  @Prop()
  purchaseDate?: Date;

  @Prop()
  cancelationDate?: Date;

  @Prop({ default: Date.now })
  reservationDate: Date;

  @Prop()
  qrCode?: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
