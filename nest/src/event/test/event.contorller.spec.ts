import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('EventController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/event (POST)', () => {
    return request(app.getHttpServer())
      .post('/event')
      .send({
        title: 'Test Event',
        description: 'Test event description',
        price: 100,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        maxOccupancy: 100,
        minOccupancy: 1,
        location: {
          type: 'Point',
          coordinates: [40.748817, -73.985428],
        },
        host: {
          id: 'hostId1',
          name: 'Test Host',
        },
      })
      .expect(201);
  });
});
