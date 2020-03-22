import { Module } from '@nestjs/common';
import { CompareController } from './compare.controller';
import {
  EncryptionModule,
  BcryptModule,
  BcryptService,
} from '@encryption/encryption';
import { EncryptionService } from '@encryption/encryption/encryption.service';

@Module({
  imports: [EncryptionModule, BcryptModule],
  controllers: [CompareController],
  providers: [BcryptService, EncryptionService],
  exports: [EncryptionModule, BcryptModule],
})
export class CompareModule {}
