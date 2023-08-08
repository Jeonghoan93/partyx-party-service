import { Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class EmailNotificationService {
  private ses;

  constructor() {
    this.ses = new SES({
      region: 'eu-north-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async sendEmail(createNotificationDto: CreateNotificationDto) {
    // Implement your email sending logic here
    const { subject, body, recipient } = createNotificationDto;

    const params = {
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
      return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
