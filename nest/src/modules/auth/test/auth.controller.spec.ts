import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

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

  it('Should register', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'Jon Doe',
        password: 'Test1234',
        confirmPassword: 'Test1234',
        email: 'test222@email',
      });

    if (res.status === 400) {
      console.error('res.body: ', res.body);
    }

    expect(res.status).toEqual(201);
  });

  it('Should login', async () => {
    // Create a new user
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'Jon Doe',
        password: 'Test1234',
        confirmPassword: 'Test1234',
        email: 'test54@email',
      })
      .expect(201);

    return await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: res.body.email,
        password: 'Test1234',
      })
      .expect(200);
  });

  it('Should get current user', async () => {
    // Create a new user
    const resRegister = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'Jon Doe',
        password: 'Test1234',
        email: 'test3@email',
      })
      .expect(201);

    // login
    const resLogin = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: resRegister.body.email,
        password: resRegister.body.password,
      })
      .expect(200);

    const jwt = resLogin.body.access_token;

    // use the JWT to get the current user
    return await request(app.getHttpServer())
      .get(`/api/auth/current-user`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(resRegister.body.email);
      });
  });
});
