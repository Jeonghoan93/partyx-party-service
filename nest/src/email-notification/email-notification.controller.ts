import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailNotificationService } from './email-notification.service';

@Controller('email-notification')
export class EmailNotificationController {
  constructor(
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  @Post()
  sendEmail(@Body() createNotificationDto: CreateNotificationDto) {
    return this.emailNotificationService.sendEmail(createNotificationDto);
  }
}
