import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from './users';

@Schema()
export class Account extends Document {
  @Prop({ ref: 'User' })
  userId: string;

  @Prop()
  type: string;

  @Prop()
  provider: string;

  @Prop({ unique: true }) // Based on the unique constraint provided
  providerAccountId: string;

  @Prop()
  refresh_token?: string;

  @Prop()
  access_token?: string;

  @Prop()
  expires_at?: number;

  @Prop()
  token_type?: string;

  @Prop()
  scope?: string;

  @Prop()
  id_token?: string;

  @Prop()
  session_state?: string;

  user: Users;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
