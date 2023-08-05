import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

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

  it('/api/event (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/event')
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

  it('/api/event/:id (DELETE)', async () => {
    // Create a new event
    const res = await request(app.getHttpServer())
      .post('/api/event')
      .send({
        title: 'Test2 Event',
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
        },
        host: {
          id: 'hostId1',
          name: 'Test Host',
        },
      })
      .expect(201);

    return request(app.getHttpServer())
      .delete(`/api/event/${res.body._id}`)
      .expect(200);
  });

  it('/api/event/:id (PUT)', async () => {
    // Create a new event
    const res = await request(app.getHttpServer())
      .post('/api/event')
      .send({
        title: 'Test2 Event',
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
        },
        host: {
          id: 'hostId1',
          name: 'Test Host',
        },
      })
      .expect(201);

    return request(app.getHttpServer())
      .put(`/api/event/${res.body._id}`)
      .send({
        title: 'Updated Test Event',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.title).toEqual('Updated Test Event');
      });
  });

  describe('/api/event/:id (GET)', () => {
    it('should get an event by id', async () => {
      // Create a new event
      const res = await request(app.getHttpServer())
        .post('/api/event')
        .send({
          title: 'Test2 Event',
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
          },
          host: {
            id: 'hostId1',
            name: 'Test Host',
          },
        })
        .expect(201);

      return request(app.getHttpServer())
        .get(`/api/event/${res.body._id}`)
        .expect(200)
        .then((response) => {
          expect(response.body._id).toBeDefined();
          expect(response.body.title).toBeDefined();
        });
    });

    it('should return 404 for non-existing event', () => {
      return request(app.getHttpServer())
        .get(`/api/event/nonExistingId`)
        .expect(404);
    });
  });
});
