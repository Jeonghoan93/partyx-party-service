import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { StripeController } from '../stripe.controller';
import { StripeService } from '../stripe.service';

describe('StripeController', () => {
  let app: INestApplication;

  const mockUserId = 'user123';
  const mockRequest = { user: { id: mockUserId } };

  const mockStripeService = {
    createCharge: jest.fn(),
    createRefund: jest.fn(),
    getRefund: jest.fn(),
    listRefunds: jest.fn(),
    getTransactionHistory: jest.fn(),
    listPaymentMethods: jest.fn(),
    addPaymentMethod: jest.fn(),
    listInvoices: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [StripeService, Logger],
    })
      .overrideProvider(StripeService)
      .useValue(mockStripeService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('createCharge', () => {
    it('should successfully create a charge', () => {
      const paymentData = {
        amount: 1000,
        source: 'test_source',
      };
      mockStripeService.createCharge.mockResolvedValue({
        id: 'ch_test',
        amount: 1000,
        currency: 'sek',
      });

      return request(app.getHttpServer())
        .post('/api/stripe/charge')
        .send(paymentData)
        .expect(201)
        .expect((response) => {
          expect(response.body.id).toEqual('ch_test');
          expect(response.body.amount).toEqual(1000);
        });
    });
  });

  // 2. Testing createRefund endpoint
  describe('POST /refund', () => {
    it('should successfully create a refund', () => {
      const refundData = {
        chargeId: 'ch_test',
        amount: 500,
      };

      mockStripeService.createRefund.mockResolvedValue({
        id: 'ref_test',
        amount: 500,
        // ... other refund fields ...
      });

      return request(app.getHttpServer())
        .post('/api/stripe/refund')
        .send(refundData)
        .expect(201)
        .expect((response) => {
          expect(response.body.id).toEqual('ref_test');
          expect(response.body.amount).toEqual(500);
        });
    });
  });

  // 3. Testing getRefund endpoint
  describe('GET /refund/:id', () => {
    it('should retrieve a specific refund', () => {
      const refundId = 'ref_test';
      mockStripeService.getRefund.mockResolvedValue({
        id: 'ref_test',
        amount: 500,
        // ... other refund fields ...
      });

      return request(app.getHttpServer())
        .get(`/api/stripe/refund/${refundId}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.id).toEqual('ref_test');
        });
    });
  });

  // 4. Testing listRefunds endpoint
  describe('GET /refunds', () => {
    it('should list all refunds', () => {
      mockStripeService.listRefunds.mockResolvedValue([
        /* array of refunds */
      ]);

      return request(app.getHttpServer())
        .get('/api/stripe/refunds')
        .expect(200);
    });
  });

  // 5. Testing getTransactionHistory endpoint
  describe('GET /history', () => {
    it('should retrieve the transaction history for a user', () => {
      mockStripeService.getTransactionHistory.mockResolvedValue([
        /* array of charges */
      ]);

      return request(app.getHttpServer())
        .get('/api/stripe/history')
        .set('user', mockRequest.user)
        .expect(200);
    });
  });

  // 6. Testing listPaymentMethods endpoint
  describe('GET /methods', () => {
    it('should list all payment methods for a user', () => {
      mockStripeService.listPaymentMethods.mockResolvedValue([
        /* array of payment methods */
      ]);

      return request(app.getHttpServer())
        .get('/api/stripe/methods')
        .set('user', mockRequest.user)
        .expect(200);
    });
  });

  // 7. Testing addPaymentMethod endpoint
  describe('POST /methods', () => {
    it('should add a payment method for a user', () => {
      const methodData = {
        paymentMethodId: 'pm_test',
      };

      mockStripeService.addPaymentMethod.mockResolvedValue({
        id: 'pm_test',
        // ... other payment method fields ...
      });

      return request(app.getHttpServer())
        .post('/api/stripe/methods')
        .set('user', mockRequest.user)
        .send(methodData)
        .expect(201);
    });
  });

  // 8. Testing listInvoices endpoint
  describe('GET /invoices', () => {
    it('should list all invoices for a user', () => {
      mockStripeService.listInvoices.mockResolvedValue([
        /* array of invoices */
      ]);

      return request(app.getHttpServer())
        .get('/api/stripe/invoices')
        .set('user', mockRequest.user)
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
