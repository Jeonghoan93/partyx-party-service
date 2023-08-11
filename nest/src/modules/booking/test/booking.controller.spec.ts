import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AppModule } from 'src/app.module';
import { BookingSchema } from '../../../common/schema/booking';
import { BookingController } from '../booking.controller';
import { BookingService } from '../booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';

describe('BookingController', () => {
  let bookingController: BookingController;
  let bookingService: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
      ],
      controllers: [BookingController],
      providers: [BookingService],
    }).compile();

    bookingController = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);
  });

  describe('create and findAll', () => {
    it('should create a booking and retrieve it', async () => {
      const testBookingDto: CreateBookingDto = {
        user: new Types.ObjectId().toHexString(),
        event: new Types.ObjectId().toHexString(),
        reservationDate: new Date(),
        status: 'Pending',
      };

      const createdBooking = await bookingController.create(testBookingDto);
      expect(createdBooking.user).toEqual(testBookingDto.user);
      expect(createdBooking.event).toEqual(testBookingDto.event);

      //... Other assertions

      const bookings = await bookingController.findAll();
      expect(bookings[0].user).toEqual(testBookingDto.user);
      //... Other assertions
    });
  });
});
