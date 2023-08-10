import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from 'src/config/app.config';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserController } from 'src/modules/user/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventController } from '../event.controller';
import { EventModule } from '../event.module';

describe('UserController', () => {
  let app: INestApplication;

  let userController: UserController;
  let authController: AuthController;
  let eventController: EventController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
        EventModule,
        ConfigModule.forRoot({
          load: [AppConfig],
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('database.url'),
          }),
          inject: [ConfigService],
        }),
      ],

      controllers: [UserController, AuthController, EventController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    eventController = moduleFixture.get<EventController>(EventController);
    authController = moduleFixture.get<AuthController>(AuthController);
    userController = moduleFixture.get<UserController>(UserController);

    // delete the user if it exists
    const userExists = await userController.findUserByEmail('user@test.com');

    if (userExists) {
      await userController.deleteUserByEmail('user@test.com');
    }

    // Register a new user
    await authController.register({
      firstName: 'Jimmy',
      email: 'user@test.com',
      password: 'password',
      confirmPassword: 'password',
    });

    // Login the user
    const user = await authController.login({
      email: 'user@test.com',
      password: 'password',
    });

    const jwtToken = user.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
  });

  it('create event', async () => {
    const dto: CreateEventDto = {
      title: 'Sample Event',
      description: 'This is a sample event description.',
      price: 50.0,
      date: new Date(),
      startTime: new Date('2023-08-12T15:00:00'),
      endTime: new Date('2023-08-12T18:00:00'),
      maxOccupancy: 100,
      minOccupancy: 10,
      location: {
        type: 'Point',
        coordinates: [40.73061, -73.935242], // sample coordinates for New York
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        streetAddress: '123 4th St',
        country: 'USA',
      },
      host: {
        id: 'host123',
        name: 'John Doe',
      },
      theme: 'Casual',
      music: ['rock', 'pop'],
      eventImages: ['sample-image1.jpg', 'sample-image2.jpg'],
      attendees: [
        {
          userId: 'user001',
          RSVPStatus: 'Attending',
        },
        {
          userId: 'user002',
          RSVPStatus: 'Not Attending',
        },
      ],
      entertainment: [
        {
          entertainerId: 'entertainer001',
          startTime: new Date('2023-08-12T16:00:00'),
          endTime: new Date('2023-08-12T17:00:00'),
        },
      ],
      supplies: [
        {
          supplyId: 'supply001',
          quantity: 10,
        },
      ],
    };

    const result = await eventController.create(dto);

    expect(result).toBeDefined();
  });
});
