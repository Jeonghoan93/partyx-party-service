export class CreateBookingDto {
  readonly user: string;
  readonly event: string;
  readonly reservationDate: Date;
  readonly status: string;
  // ... any other fields you deem necessary for booking
}
