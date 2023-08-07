import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class BasePaymentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  eventId: string;
}

export class SchedulePaymentDto extends BasePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: Date;
}

export class ImmediatePaymentDto extends BasePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class InstallmentDto extends BasePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(2)
  @Max(24)
  installments: number; // Assume a maximum of 24 installments for simplicity.
}
