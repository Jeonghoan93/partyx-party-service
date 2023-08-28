import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schemas/user';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(query: any): Promise<User | null> {
    return this.userModel.findOne({ query }).exec();
  }

  create(data: Record<string, any>) {
    return this.userModel.create(data);
  }

  find() {
    return this.userModel.find();
  }

  deleteOne(query: any) {
    return this.userModel.deleteOne(query);
  }
}
