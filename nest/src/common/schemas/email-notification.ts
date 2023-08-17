import { Schema } from 'mongoose';

export const EmailNotificationSchema = new Schema({
  subject: String,
  body: String,
  recipient: String,
  sentAt: { type: Date, default: Date.now },
  status: String, // 'sent', 'failed', etc.
});
