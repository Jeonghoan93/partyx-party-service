import { Test, TestingModule } from '@nestjs/testing';
import { Ticket } from 'src/common/schemas/ticket';
import { TicketController } from '../ticket.controller';
import { TicketService } from '../ticket.service';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: {
            bookTicket: jest.fn(),
            cancelTicket: jest.fn(),
            getTicketsByUserId: jest.fn(),
            getTicketsByEventId: jest.fn(),
            updateTicketStatus: jest.fn(),
            getTicketDetails: jest.fn(),
          },
        },
      ],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(ticketController).toBeDefined();
  });

  describe('bookTicket', () => {
    it('should return a ticket', async () => {
      const result = {
        _id: 'ticketId',
        userId: 'userId',
        eventId: 'eventId',
        status: 'reserved',
        ticketNumber: '12345',
      } as Ticket;
      jest
        .spyOn(ticketService, 'bookTicket')
        .mockImplementation(async () => result);

      expect(await ticketController.bookTicket(result)).toBe(result);
    });
  });

  // Add more tests for other methods similarly...

  describe('cancelTicket', () => {
    it('should return a ticket', async () => {
      const result = {
        _id: 'ticketId',
        userId: 'userId',
        eventId: 'eventId',
        status: 'canceled',
        ticketNumber: '12345',
      } as Ticket;
      jest
        .spyOn(ticketService, 'cancelTicket')
        .mockImplementation(async () => result);

      expect(await ticketController.cancelTicket('ticketId')).toBe(result);
    });
  });

  // ... continue writing tests for all the methods in the controller.
});
