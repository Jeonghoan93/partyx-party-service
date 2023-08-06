export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  phone?: string;
  bio?: string;
  profilePicture?: string;
  isVerified?: boolean;
  role?: string;
  socialMediaLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  paymentDetails?: {
    cardNumber?: string;
    expiryDate?: Date;
    cvv?: string;
    billingAddress?: string;
  };
  eventsHosted?: string[];
  eventsAttended?: string[];
  ratingsReceived?: number[];
  reviewsReceived?: string[];
  joinedDate?: Date;
  isActive?: boolean;
  preferences?: {
    eventType?: string[];
    musicGenre?: string[];
  };
}

export enum UserRole {
  HOST = 'HOST',
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
}
