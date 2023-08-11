import { Schema } from 'mongoose';

export const BookingSchema = new Schema({
  // guest: { type: Types.ObjectId, ref: 'User', required: true },
  // event: { type: Types.ObjectId, ref: 'Event', required: true },
  reservationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  // ... any other fields you deem necessary for booking
});
