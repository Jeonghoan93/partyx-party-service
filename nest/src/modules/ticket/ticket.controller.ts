import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Ticket } from 'src/common/schemas/ticket';
import { TicketService } from './ticket.service';

@Controller('api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async bookTicket(@Body() ticket: Partial<Ticket>): Promise<Ticket> {
    return this.ticketService.bookTicket(ticket);
  }

  @Delete('/:id')
  async cancelTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.cancelTicket(id);
  }

  @Get('/user/:userId')
  async getTicketsByUserId(@Param('userId') userId: string): Promise<Ticket[]> {
    return this.ticketService.getTicketsByUserId(userId);
  }

  @Get('/event/:eventId')
  async getTicketsByEventId(
    @Param('eventId') eventId: string,
  ): Promise<Ticket[]> {
    return this.ticketService.getTicketsByEventId(eventId);
  }

  @Patch('/:id')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Ticket> {
    return this.ticketService.updateTicketStatus(id, status);
  }

  @Get('/:id')
  async getTicketDetails(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.getTicketDetails(id);
  }
}
