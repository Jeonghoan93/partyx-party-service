import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketRepository } from 'src/common/repositories/ticket.repository';
import { Ticket, TicketSchema } from 'src/common/schemas/ticket';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketModule {}
