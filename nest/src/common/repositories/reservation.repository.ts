import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/common/schemas/reservation';

interface IParams {
  listingId?: string;
  userId?: string;
  hostId?: string;
}

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  find(params: IParams): Promise<Reservation[]> {
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

  create(reservation: Partial<Reservation>): Promise<Reservation> {
    const newReservation = new this.reservationModel(reservation);
    return newReservation.save();
  }

  findById(id: string): Promise<Reservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  update(
    id: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation | null> {
    return this.reservationModel
      .findByIdAndUpdate(id, reservation, {
        new: true,
      })
      .exec();
  }

  delete(id: string): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }

  // ... Any other database operations specific to reservations
}
