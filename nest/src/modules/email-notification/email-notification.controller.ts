import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailNotificationService } from './email-notification.service';

@Controller('email-notification')
export class EmailNotificationController {
  constructor(
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  @Post()
  async sendEmail(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      await this.emailNotificationService.sendEmail(createNotificationDto);
      return {
        success: true,
        message: 'Email sent successfully!',
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
