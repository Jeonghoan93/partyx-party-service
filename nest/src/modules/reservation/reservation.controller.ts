import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('api/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Body() data): Promise<any> {
    return await this.reservationService.createReservation(data);
  }

  @Get(':id')
  async getReservationById(@Param('id') id: string): Promise<any> {
    return await this.reservationService.getReservationById(id);
  }

  @Put(':id')
  async modifyReservation(@Param('id') id: string, @Body() data): Promise<any> {
    return await this.reservationService.modifyReservation(id, data);
  }

  @Delete(':id')
  async cancelReservation(@Param('id') id: string): Promise<any> {
    return await this.reservationService.cancelReservation(id);
  }

  // ... Endpoints for other operations as necessary
}
