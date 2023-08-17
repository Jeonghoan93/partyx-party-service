import { Inject, Injectable } from '@nestjs/common';

import { TicketRepository } from 'src/common/repositories/ticket.repository';
import { Ticket } from 'src/common/schemas/ticket';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository) private readonly ticketDB: TicketRepository,
  ) {}

  async bookTicket(ticket: Partial<Ticket>): Promise<Ticket> {
    // You can add business logic here (e.g., check if the event is not full, etc.)
    return await this.ticketDB.create(ticket);
  }

  async cancelTicket(id: string): Promise<Ticket> {
    return await this.ticketDB.delete(id);
  }

  async getTicketsByUserId(userId: string): Promise<Ticket[]> {
    return await this.ticketDB.findByUserId(userId);
  }

  async getTicketsByEventId(eventId: string): Promise<Ticket[]> {
    return await this.ticketDB.findByEventId(eventId);
  }

  async updateTicketStatus(id: string, status: string): Promise<Ticket> {
    return await this.ticketDB.updateTicketStatus(id, status);
  }

  async getTicketDetails(id: string): Promise<Ticket> {
    return await this.ticketDB.findById(id);
  }
}
