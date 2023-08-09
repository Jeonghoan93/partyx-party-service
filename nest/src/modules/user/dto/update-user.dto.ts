import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  lastName?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  ratingsReceived?: boolean;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  socialMediaLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };

  @IsString()
  @IsOptional()
  paymentDetails?: {
    cardNumber?: string;
    expiryDate?: Date;
    cvv?: string;
    billingAddress?: string;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  eventsHosted?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  eventsAttended?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  reviewsReceived?: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferences?: {
    eventType?: string[];
    musicGenre?: string[];
  };
}
