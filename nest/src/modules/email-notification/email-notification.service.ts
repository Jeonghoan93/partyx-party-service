import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SES } from 'aws-sdk';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailNotification } from './interfaces/email-notification.interface';

@Injectable()
export class EmailNotificationService {
  private ses;

  constructor(
    @InjectModel('EmailNotification')
    private readonly emailModel: Model<EmailNotification>,
  ) {
    this.ses = new SES({
      region: 'eu-north-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async sendEmail(createNotificationDto: CreateNotificationDto) {
    const { subject, body, recipient } = createNotificationDto;
    let status = 'sent';

    const params = {
      Source: 'your-sender-email@example.com',
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };

    try {
      await this.ses.sendEmail(params).promise();
    } catch (err) {
      status = 'failed';
      throw new Error(err.message);
    } finally {
      // log the email to db
      await this.emailModel.create({
        ...createNotificationDto,
        status: status,
        sendAt: new Date(),
      });
    }
  }
}
