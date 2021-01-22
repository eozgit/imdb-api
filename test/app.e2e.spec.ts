import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: request.SuperTest<request.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      controllers: [AppController]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    client = request(app.getHttpServer());
  });

  it('/ (POST)', (done) => client
    .post('/')
    .send({ text: 'test' })
    .expect(201)
    .expect('test')
    .end(done)
  );
});
