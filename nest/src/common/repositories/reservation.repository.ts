import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/common/schemas/reservation';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async find(params): Promise<Reservation[]> {
    const { listingId, userId, hostId } = params;
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (hostId) {
      query.hostId = hostId;
    }

    return this.reservationModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async create(reservation: Partial<Reservation>): Promise<Reservation> {
    const newReservation = new this.reservationModel(reservation);
    return await newReservation.save();
  }

  async findById(id: string): Promise<Reservation | null> {
    return await this.reservationModel.findById(id).exec();
  }

  async update(
    id: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation | null> {
    return await this.reservationModel
      .findByIdAndUpdate(id, reservation, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<Reservation | null> {
    return await this.reservationModel.findByIdAndDelete(id).exec();
  }

  // ... Any other database operations specific to reservations
}
