import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../../common/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const emailExists = await this.userModel.findOne({ email: dto.email });

    if (emailExists) {
      throw new ConflictException('Email already exists.');
    }

    if (!dto.password) {
      throw new BadRequestException('Password not provided.');
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(dto.password, 10);
    } catch (err) {
      throw new InternalServerErrorException('Error hashing password.');
    }

    const createdUser = new this.userModel({
      ...dto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId).exec();
  }

  async deleteUserByEmail(email: string): Promise<void> {
    await this.userModel.deleteOne({ email }).exec();
  }
  // Add other CRUD methods as needed...
}
