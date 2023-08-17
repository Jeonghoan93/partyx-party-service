import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

describe('EventController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return events in Stockholm', async () => {
    // Create a new event with location in Stockholm
    await request(app.getHttpServer())
      .post('/api/event')
      .send({
        title: 'Test3 Event',
        description: 'Test2 event description',
        price: 300,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        maxOccupancy: 100,
        minOccupancy: 1,
        location: {
          type: 'Point',
          coordinates: [40.748817, -73.985428],
          city: 'Stockholm',
          state: 'Stockholm',
          zipCode: '111 52',
          streetAddress: 'Stockholm 18',
          country: 'Sweden',
        },
        host: {
          id: 'hostId1',
          name: 'Test Host',
        },
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/api/search/events')
      .query({ city: 'Stockholm' });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].location.city).toBe('Stockholm');
  });
});
