import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserTypes } from 'src/common/schema/users';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

class SocialMediaLinksDto {
  @IsString()
  @IsOptional()
  facebook: string;

  @IsString()
  @IsOptional()
  twitter: string;

  @IsString()
  @IsOptional()
  instagram: string;
}

class PaymentDetailsDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsDate()
  @IsNotEmpty()
  expiryDate: Date;

  @IsString()
  @IsNotEmpty()
  cvv: string;

  @IsString()
  @IsNotEmpty()
  billingAddress: string;
}

class PreferencesDto {
  @IsString({ each: true })
  @IsOptional()
  eventType: string[];

  @IsString({ each: true })
  @IsOptional()
  musicGenre: string[];
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ValidateNested()
  @Type(() => SocialMediaLinksDto)
  @IsOptional()
  socialMediaLinks?: SocialMediaLinksDto;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  @IsOptional()
  paymentDetails?: PaymentDetailsDto;

  @ValidateNested()
  @Type(() => PreferencesDto)
  @IsOptional()
  preferences?: PreferencesDto;

  @IsEnum(UserTypes)
  @IsOptional()
  type?: string;

  isVerified?: boolean;
}
