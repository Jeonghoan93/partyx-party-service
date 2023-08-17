import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/common/repositories/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationDB: ReservationRepository) {}

  async createReservation(data): Promise<any> {
    return await this.reservationDB.create(data);
  }

  async getReservationById(id: string): Promise<any> {
    return await this.reservationDB.findById(id);
  }

  async modifyReservation(id: string, data): Promise<any> {
    return await this.reservationDB.update(id, data);
  }

  async cancelReservation(id: string): Promise<any> {
    return await this.reservationDB.delete(id);
  }

  async getReservations(params): Promise<any[]> {
    try {
      const reservations = await this.reservationDB.find(params);

      const safeReservations = reservations.map((reservation) => ({
        ...reservation.toJSON(),
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.event,
          createdAt: reservation.event.createdAt.toISOString(),
        },
      }));

      return safeReservations;
    } catch (err) {
      throw err;
    }
  }

  // ... Any other reservation-specific business logic
}
