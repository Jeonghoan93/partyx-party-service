import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  maxOccupancy: { type: Number, required: true },
  minOccupancy: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point', required: true },
    coordinates: { type: [Number], required: true },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    streetAddress: { type: String, required: false },
    country: { type: String, required: false },
  },
  host: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  theme: { type: String, required: false },
  music: { type: [String], required: false },
  eventImages: { type: [String], required: false },
  attendees: [
    {
      userId: { type: String, required: true },
      RSVPStatus: { type: String, required: true },
    },
  ],
  entertainment: [
    {
      entertainerId: { type: String, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
  supplies: [
    {
      supplyId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});
