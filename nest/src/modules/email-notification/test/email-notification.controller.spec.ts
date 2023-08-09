// src/email-notification/test/email-notification.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { EmailNotificationController } from '../email-notification.controller';
import { EmailNotificationService } from '../email-notification.service';

describe('EmailNotificationController', () => {
  let controller: EmailNotificationController;
  let mockService: EmailNotificationService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailNotificationController],
      providers: [
        {
          provide: EmailNotificationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmailNotificationController>(
      EmailNotificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email and return success', async () => {
      const dto: CreateNotificationDto = {
        subject: 'Test Subject',
        body: '<h1>Test Body</h1>',
        recipient: 'test@example.com',
      };

      mockService.sendEmail = jest.fn().mockResolvedValueOnce({
        success: true,
        message: 'Email sent successfully!',
      });

      const result = await controller.sendEmail(dto);
      expect(result).toEqual({
        success: true,
        message: 'Email sent successfully!',
      });
    });

    // Add more tests here to test for failures, different scenarios...
  });
});
