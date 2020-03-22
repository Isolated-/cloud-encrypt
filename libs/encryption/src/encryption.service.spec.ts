import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BCRYPT_REGEX_EXP } from './bcrypt/bcrypt.constant';
import { ConfigService, ConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');

describe('EncryptionService', () => {
  let service: EncryptionService;
  let bcrypt: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            BCRYPT_HASH_ROUNDS: Joi.number().default(1),
          }),
        }),
      ],
      providers: [EncryptionService, BcryptService, ConfigService],
    }).compile();

    bcrypt = module.get<BcryptService>(BcryptService);
    service = module.get<EncryptionService>(EncryptionService);
  });

  test('.encrypt() should use Bcrypt encryption', async () => {
    const string = 'password';
    const encryption = bcrypt;

    const result = await service.setEncryption(encryption).encrypt(string);
    expect(result).toMatch(BCRYPT_REGEX_EXP);
  });
});
