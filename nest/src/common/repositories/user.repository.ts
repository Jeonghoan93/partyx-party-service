import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/common/schemas/users';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  findOne(query: any) {
    return this.userModel.findOne(query);
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
