import {
  Inject,
  Injectable
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/common/repositories/user.repository';
import { Users, userTypes } from 'src/common/schema/users';
import { sendEmail } from 'src/common/util/mail-handler';
import { generatedHashPassword } from 'src/common/util/password-manager';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}
 
  async findAll(): Promise<Users[]> {
    return await this.userDB.find().exec();
  }

  async create(dto: CreateUserDto): Promise<any>  {
    try {
      // generate hashed password
      dto.password = await generatedHashPassword(dto.password);

      // check if admin
      if (dto.type === userTypes.ADMIN) {
        throw new Error('Now allow to create admin user');
      } else {
        dto.isVerified = true;
      }

      // user exists?
      const user = await this.userDB.findOne({ email: dto.email })
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

      if (dto.type === userTypes.ADMIN) {
        sendEmail(
          dto.email,
          'Welcome to the admin panel',
          `Your OTP is ${otp}`
        );
      }

      return {
        success: true,
        message: 'User created successfully',
        result: { email: newUser.email}
      }
  
    } catch(err) {
      throw new Error(err);
    }
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.userDB.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.userDB.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<Users | undefined> {
    return this.userDB.findById(userId).exec();
  }

  async deleteUserByEmail(email: string): Promise<void> {
    await this.userDB.deleteOne({ email }).exec();
  }

  async updateUserByEmail(email: string, password: string): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.userDB.findOneAndUpdate(

  // Add other CRUD methods as needed...
}
