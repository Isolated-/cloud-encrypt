import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi = require('@hapi/joi');
import { DEFAULT_NODE_PORT, DEFAULT_BCRYPT_HASH_ROUNDS } from './app.constant';
import { EncryptModule } from './encrypt/encrypt.module';
import { EncryptionModule } from '@encryption/encryption';
import { EncryptionService } from '@encryption/encryption/encryption.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'staging', 'production')
          .default('development'),

        NODE_PORT: Joi.number().default(DEFAULT_NODE_PORT),

        BCRYPT_HASH_ROUNDS: Joi.number().default(DEFAULT_BCRYPT_HASH_ROUNDS),
      }),
    }),
    EncryptModule,
    EncryptionModule,
  ],
  providers: [EncryptionService],
  exports: [ConfigModule, EncryptionModule],
})
export class AppModule {}
