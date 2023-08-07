import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AuthController (e2e)', () => {
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

  it.only('Should register', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'Jon Doe',
        password: 'Test1234',
        email: 'test@email',
      })
      .expect(201);
  });

  it('Should login', async () => {
    // Create a new user
    const res = request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'Jon Doe',
        password: 'Test1234',
        email: 'test2@email',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post(`/api/auth/login/${res.body._id}`)
      .send({
        title: 'Updated Test Event',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.title).toEqual('Updated Test Event');
      });
  });
});
