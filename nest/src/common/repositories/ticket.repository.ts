import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from 'src/common/schemas/ticket';

@Injectable()
export class TicketRepository {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  create(ticket: Partial<Ticket>): Promise<Ticket> {
    const newTicket = new this.ticketModel(ticket);
    return newTicket.save();
  }

  findById(id: string): Promise<Ticket | null> {
    return this.ticketModel.findById(id).exec();
  }

  findByUserId(userId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userId }).exec();
  }

  findByEventId(eventId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ eventId }).exec();
  }

  updateTicketStatus(id: string, status: string): Promise<Ticket> {
    return this.ticketModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  delete(id: string): Promise<Ticket> {
    return this.ticketModel.findByIdAndDelete(id).exec();
  }
}
