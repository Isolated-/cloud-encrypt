import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');
import { DEFAULT_NODE_PORT, DEFAULT_BCRYPT_HASH_ROUNDS } from './app.constant';
import { EncryptModule } from './encrypt/encrypt.module';
import { EncryptionModule, BcryptService } from '@encryption/encryption';
import { EncryptionService } from '@encryption/encryption/encryption.service';
import { CompareModule } from './compare/compare.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'staging', 'production')
          .default('development'),

        NODE_PORT: Joi.number().default(DEFAULT_NODE_PORT),

        BCRYPT_HASH_ROUNDS: Joi.number()
          .default(DEFAULT_BCRYPT_HASH_ROUNDS)
          .min(1)
          .max(13),
      }),
    }),
    EncryptModule,
    EncryptionModule,
    CompareModule,
  ],
  providers: [EncryptionService, BcryptService],
  exports: [ConfigModule, EncryptionModule],
})
export class AppModule {}
