import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/common/schemas/account';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  findOne(query: any) {
    return this.accountModel.findOne(query);
  }

  create(data: Record<string, any>) {
    return this.accountModel.create(data);
  }

  find() {
    return this.accountModel.find();
  }

  deleteOne(query: any) {
    return this.accountModel.deleteOne(query);
  }
}
