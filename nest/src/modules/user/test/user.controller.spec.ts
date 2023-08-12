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

    expect(result.success).toBeTruthy();
    expect(result.message).toBe('User created successfully');
    expect(result.result.email).toBe(user.email);
  });

  it('should fetch all users', async () => {
    const users = await controller.findAll();
    expect(Array.isArray(users)).toBeTruthy();
  });

  it('should fetch a user by email', async () => {
    const email = 'test@email.com';

    // create user first
    const dto: CreateUserDto = {
      firstName: 'Jimmy',
      email: email,
      password: '1234567890',
    };

    await controller.create(dto);

    const user = await controller.findUserByEmail(email);

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it('should delete a user by email and return a success message', async () => {
    const email = 'test@email.com';
    const response = await controller.deleteUserByEmail(email);
    expect(response.message).toBe('User deleted successfully.');
  });
});
