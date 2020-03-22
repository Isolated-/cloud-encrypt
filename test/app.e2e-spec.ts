import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ENCRYPT_ROUTE } from './../src/app.constant';
import { BCRYPT_REGEX_EXP } from '@encryption/encryption/bcrypt/bcrypt.constant';

describe('EncryptController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test(`POST ${ENCRYPT_ROUTE} should return encrypted string`, () => {
    const data = {
      encryption: 'bcrypt',
      string: 'password',
    };

    return request(app.getHttpServer())
      .post(ENCRYPT_ROUTE)
      .send(data)
      .expect(HttpStatus.CREATED)
      .then(data => {
        const body = data.body;
        expect(body.success).toBeTruthy();
        expect(body.value).toMatch(BCRYPT_REGEX_EXP);
      });
  });
});
