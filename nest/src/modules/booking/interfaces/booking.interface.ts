import { Document } from 'mongoose';

export interface Booking extends Document {
  user: string;
  event: string;
  reservationDate: Date;
  status: string;
  // ... any other fields you deem necessary for booking
}
