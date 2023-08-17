import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from 'src/common/schemas/ticket';

@Injectable()
export class TicketRepository {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async create(ticket: Partial<Ticket>): Promise<Ticket> {
    const newTicket = new this.ticketModel(ticket);
    return await newTicket.save();
  }

  async findById(id: string): Promise<Ticket | null> {
    return await this.ticketModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ userId }).exec();
  }

  async findByEventId(eventId: string): Promise<Ticket[]> {
    return await this.ticketModel.find({ eventId }).exec();
  }

  async updateTicketStatus(id: string, status: string): Promise<Ticket> {
    return await this.ticketModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Ticket> {
    return await this.ticketModel.findByIdAndDelete(id).exec();
  }
}
