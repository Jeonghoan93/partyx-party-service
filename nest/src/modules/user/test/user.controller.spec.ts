import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from 'src/config/app.config';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserController } from '../user.controller';
import { UserModule } from '../user.module';

describe('UserController', () => {
  let app: INestApplication;

  let controller: UserController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
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
      controllers: [UserController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<UserController>(UserController);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await controller.deleteUserByEmail('test@email.com');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create user', async () => {
    const user: CreateUserDto = {
      firstName: 'Jimmy',
      email: 'test@email.com',
      password: '1234567890',
    };

    const result = await controller.create(user);

    expect(result).toBeDefined();
    expect(result.firstName).toBe('Jimmy');
  });

  it('find user by email', async () => {
    // Create a user
    const user: CreateUserDto = {
      firstName: 'Jimmy',
      email: 'test@email.com',
      password: '1234567890',
    };

    const result = await controller.create(user);

    // Find the user by email
    const foundUser = await controller.findByEmail(result.email);

    expect(foundUser).toBeDefined();
    expect(foundUser.firstName).toBe('Jimmy');
  });
});
