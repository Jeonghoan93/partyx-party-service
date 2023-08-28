import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/repositories/user.repository';
import { User, UserTypes } from 'src/common/schemas/user';
import { generatedHashPassword } from 'src/common/util/password-manager';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userDB.find();
  }

  async create(dto: CreateUserDto): Promise<any> {
    try {
      // generate hashed password
      dto.password = await generatedHashPassword(dto.password);

      // check if admin
      if (dto.type === UserTypes.ADMIN) {
        throw new Error('Now allow to create admin user');
      } else {
        dto.isVerified = true;
      }

      // user exists?
      const user = await this.userDB.findOne({ email: dto.email });
      if (user) {
        throw new Error('User already exists');
      }

      // generate otp
      const otp = Math.floor(Math.random() * 900000) + 100000;

      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      // create user
      const newUser = await this.userDB.create({
        ...dto,
        otp,
        otpExpiryTime,
      });

      // if (dto.type === UserTypes.ADMIN) {
      //   sendEmail(
      //     dto.email,
      //     'Welcome to the admin panel',
      //     `Your OTP is ${otp}`,
      //   );
      // }

      return {
        success: true,
        message: 'User created successfully',
        result: { email: newUser.email },
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userDB.findOne({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userDB.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userDB.findOne(userId);
  }

  async deleteUserByEmail(email: string): Promise<void> {
    await this.userDB.deleteOne({ email });
  }

  // Add other CRUD methods as needed...
}
