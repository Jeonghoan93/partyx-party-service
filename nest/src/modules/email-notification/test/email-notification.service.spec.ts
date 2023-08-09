import { Test, TestingModule } from '@nestjs/testing';
import { SES } from 'aws-sdk';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { EmailNotificationService } from '../email-notification.service';

describe('EmailNotificationService', () => {
  let service: EmailNotificationService;
  let mockSES;
  let mockEmailModel;

  beforeEach(async () => {
    mockSES = {
      sendEmail: jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      }),
    };

    mockEmailModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailNotificationService,
        {
          provide: 'EmailNotificationModel',
          useValue: mockEmailModel,
        },
        {
          provide: SES,
          useValue: mockSES,
        },
      ],
    }).compile();

    service = module.get<EmailNotificationService>(EmailNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email and log to the database with status "sent" when successful', async () => {
      const createNotificationDto: CreateNotificationDto = {
        subject: 'Test',
        body: 'Hello, Test!',
        recipient: 'test@example.com',
      };

      mockSES.sendEmail.mockResolvedValueOnce({});

      await service.sendEmail(createNotificationDto);

      expect(mockSES.sendEmail).toHaveBeenCalled();
      expect(mockEmailModel.create).toHaveBeenCalledWith({
        ...createNotificationDto,
        status: 'sent',
        sendAt: expect.any(Date),
      });
    }, 10000);

    it('should throw error, and log to the database with status "failed" on failure', async () => {
      const createNotificationDto: CreateNotificationDto = {
        subject: 'Test',
        body: 'Hello, Test!',
        recipient: 'test@example.com',
      };

      mockSES.sendEmail.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValue(new Error('Email send failed')),
      });

      await expect(
        service.sendEmail(createNotificationDto),
      ).rejects.toThrowError('Email send failed');

      expect(mockSES.sendEmail).toHaveBeenCalled();
      expect(mockEmailModel.create).toHaveBeenCalledWith({
        ...createNotificationDto,
        status: 'failed',
        sendAt: expect.any(Date),
      });
    });
  });
});
