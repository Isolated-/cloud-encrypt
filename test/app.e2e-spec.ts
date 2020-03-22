import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ENCRYPT_ROUTE, COMPARE_ROUTE } from './../src/app.constant';
import { BCRYPT_REGEX_EXP } from '@encryption/encryption/bcrypt/bcrypt.constant';
import { BcryptService } from '@encryption/encryption';

describe('EncryptController (e2e)', () => {
  let app: INestApplication;
  let bcrypt: BcryptService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    bcrypt = moduleFixture.get<BcryptService>(BcryptService);
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

  test(`POST ${COMPARE_ROUTE} should return true (matched)`, async () => {
    const data = {
      encryption: 'bcrypt',
      string: 'password',
      hash: await bcrypt.encrypt('password'),
    };

    return request(app.getHttpServer())
      .post(COMPARE_ROUTE)
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect({ success: true });
  });

  test(`POST ${COMPARE_ROUTE} should return false (not matched)`, async () => {
    const data = {
      encryption: 'bcrypt',
      string: 'password1',
      hash: await bcrypt.encrypt('password'),
    };

    return request(app.getHttpServer())
      .post(COMPARE_ROUTE)
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect({ success: false });
  });

  test(`POST ${ENCRYPT_ROUTE} should return 400 (no data)`, async () => {
    return request(app.getHttpServer())
      .post(ENCRYPT_ROUTE)
      .expect(HttpStatus.BAD_REQUEST);
  });

  test(`POST ${COMPARE_ROUTE} should return 400 (no data)`, async () => {
    return request(app.getHttpServer())
      .post(COMPARE_ROUTE)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
