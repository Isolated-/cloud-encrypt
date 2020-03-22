import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import { BCRYPT_REGEX_EXP } from './bcrypt.constant';
import { ConfigService, ConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            BCRYPT_HASH_ROUNDS: Joi.number().default(1),
          }),
        }),
      ],
      providers: [BcryptService, ConfigService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  test('should have a .encrypt() method', () =>
    expect(service.encrypt).toBeInstanceOf(Function));

  test('should have .compare() method', () =>
    expect(service.compare).toBeInstanceOf(Function));

  test('.encrypt() should return a bcrypt-encrypted string', async () => {
    const string = 'password';

    const result = await service.encrypt(string);
    expect(result).toMatch(BCRYPT_REGEX_EXP);
  });

  test('should return true: bcrypt string matched in comparison', async () => {
    const string = 'password';
    const hash = await service.encrypt(string);

    const result = await service.compare(string, hash);
    expect(result).toBeTruthy();
  });

  describe('.compare() failing tests', () => {
    test('should return false (compared password/Password)', async () => {
      const string = 'password';
      const hash = await service.encrypt('Password');

      const result = await service.compare(string, hash);
      expect(result).toBeFalsy();
    });

    test('should return false (compared password/password1)', async () => {
      const string = 'password';
      const hash = await service.encrypt('password1');

      const result = await service.compare(string, hash);
      expect(result).toBeFalsy();
    });
  });
});
