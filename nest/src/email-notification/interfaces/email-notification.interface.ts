import { Document } from 'mongoose';

export interface EmailNotification extends Document {
  readonly subject: string;
  readonly body: string;
  readonly recipient: string;
  readonly sentAt: Date;
  readonly status: string;
}
