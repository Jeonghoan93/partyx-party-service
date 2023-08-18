import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/common/schemas/account';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async findOne(query: any) {
    return await this.accountModel.findOne(query);
  }

  async create(data: Record<string, any>) {
    return await this.accountModel.create(data);
  }

  async find() {
    return await this.accountModel.find();
  }

  async deleteOne(query: any) {
    return await this.accountModel.deleteOne(query);
  }
}
