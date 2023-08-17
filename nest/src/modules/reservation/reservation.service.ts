import { Injectable } from '@nestjs/common';
import { ReservationRepository } from 'src/common/repositories/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationDB: ReservationRepository) {}

  async createReservation(data): Promise<any> {
    // Business logic for creating a reservation
    return await this.reservationDB.create(data);
  }

  async getReservationById(id: string): Promise<any> {
    // Business logic to fetch a specific reservation by ID
    return await this.reservationDB.findById(id);
  }

  async modifyReservation(id: string, data): Promise<any> {
    // Business logic to modify an existing reservation
    return await this.reservationDB.update(id, data);
  }

  async cancelReservation(id: string): Promise<any> {
    // Business logic to cancel a reservation
    return await this.reservationDB.delete(id);
  }

  async getReservations(params): Promise<any[]> {
    try {
      const reservations = await this.reservationDB.find(params);

      return reservations.map((reservation) => ({
        ...reservation.toJSON(),
        createdAt: reservation.createdAt.toISOString(),
        updatedAt: reservation.updatedAt.toISOString(),
        endDate: reservation.endDate.toISOString(),
        startDate: reservation.startDate.toISOString(),
      }));
    } catch (err) {
      throw err;
    }
  }

  // ... Any other reservation-specific business logic
}
