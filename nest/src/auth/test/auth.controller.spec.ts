import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/interfaces/user.interface';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../local.strategy';

describe('AuthModule', () => {
  let authService: AuthService;
  let authController: AuthController;

  let userService: UserService;

  const mockUserModel = {
    // mock methods like find, save, etc.
    findByUsername: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testSecret',
          signOptions: { expiresIn: '1h' },
        }),
        UserModule,
      ],
      providers: [
        AuthService,
        UserService,
        {
          provide: 'UserModel', // This matches @InjectModel('User')
          useValue: mockUserModel,
        },
        LocalStrategy,
        JwtService,
      ],
      controllers: [AuthController],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });

    describe('validateUser', () => {
      it('should return a user if valid firstName and password is provided', async () => {
        // Mock UserService's findByUsername to return a fake user for this test
        const user = {
          email: 'test@email.com',
          firstName: 'test',
          password: 'hashedpassword', // Mock bcrypt's hash
        };

        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementation(() => Promise.resolve(user as User));

        const result = await authService.validateUser('test', 'password');
        expect(result).toEqual(user);
      });
    });

    describe('login', () => {
      it('should return an access token', async () => {
        const user = { firstName: 'testUser', userId: '1234' };
        const result = await authService.login(user);
        expect(result).toHaveProperty('access_token');
      });
    });

    describe('register', () => {
      it('should register a user', async () => {
        const user = {
          email: 'test@email.com',
          firstName: 'test',
          password: 'hashedpassword',
          // ... other fields
        };

        jest
          .spyOn(userService, 'create')
          .mockImplementation(() => Promise.resolve(user as User));

        expect(await authService.register(new CreateUserDto())).toEqual(user);
      });
    });
  });

  describe('AuthController', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });

    describe('login', () => {
      it('should return an access token when credentials are valid', async () => {
        const result = { access_token: 'testToken' };
        jest
          .spyOn(authService, 'login')
          .mockImplementation(() => Promise.resolve(result));

        expect(
          await authController.login({
            user: { firstName: 'testUser', userId: '1234' },
          }),
        ).toBe(result);
      });
    });

    describe('register', () => {
      it('should register a user', async () => {
        const user = {
          email: 'test@email.com',
          firstName: 'test',
          password: 'hashedpassword',
          // ... other fields
        };

        jest
          .spyOn(authService, 'register')
          .mockImplementation(() => Promise.resolve(user as User));

        expect(
          await authController.register({ body: new CreateUserDto() }),
        ).toEqual(user);
      });
    });
  });
});
