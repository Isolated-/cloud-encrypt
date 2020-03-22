import { Module } from '@nestjs/common';
import { EncryptController } from './encrypt.controller';
import {
  EncryptionModule,
  BcryptModule,
  BcryptService,
} from '@encryption/encryption';
import { EncryptionService } from '@encryption/encryption/encryption.service';

@Module({
  imports: [EncryptionModule, BcryptModule],
  controllers: [EncryptController],
  providers: [EncryptionService, BcryptService],
  exports: [EncryptionModule, BcryptModule],
})
export class EncryptModule {}
