import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  phone: String,
  bio: String,
  profilePicture: String,
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'user' }, // You might want to set a default role.
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
  paymentDetails: {
    cardNumber: String,
    expiryDate: Date,
    cvv: String,
    billingAddress: String,
  },
  eventsHosted: [String],
  eventsAttended: [String],
  ratingsReceived: [Number],
  reviewsReceived: [String],
  joinedDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  preferences: {
    eventType: [String],
    musicGenre: [String],
  },
});
