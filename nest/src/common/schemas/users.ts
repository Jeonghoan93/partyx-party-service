import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Event } from './event';
import { Reservation } from './reservation';

export enum UserTypes {
  ADMIN = 'admin',
  GUEST = 'guest',
  HOST = 'host',
}

export class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  postalCode: string;

  @Prop()
  country: string;
}

export class SocialMediaLinks {
  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop()
  instagram: string;
}

export class PaymentDetails {
  @Prop()
  cardNumber: string;

  @Prop()
  expiryDate: Date;

  @Prop()
  cvv: string;

  @Prop()
  billingAddress: string;
}

export class Preferences {
  @Prop({ type: [String] })
  eventType: string[];

  @Prop({ type: [String] })
  musicGenre: string[];
}

@Schema({ timestamps: true })
export class Users extends Document {
  success: boolean;

  message: string;

  result: any;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  phone: string;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: SocialMediaLinks })
  socialMediaLinks: SocialMediaLinks;

  @Prop({ type: PaymentDetails })
  paymentDetails: PaymentDetails;

  @Prop({ type: [String] })
  eventHosted: string[];

  @Prop({ type: [String] })
  eventAttended: string[];

  @Prop({ type: [Number] })
  ratingsReceived: number[];

  @Prop({ type: [String] })
  reviewsReceived: string[];

  @Prop({ default: Date.now })
  joinedDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Preferences })
  preferences: Preferences;

  @Prop({ enum: [UserTypes.ADMIN, UserTypes.GUEST, UserTypes.HOST] })
  type: string;

  createdAt: Date;

  updatedAt: Date;

  emailVerified: boolean;

  reservations?: Reservation[];

  events?: Event[];

  favoriteEvents?: Event[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
