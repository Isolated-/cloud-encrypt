import { Module } from '@nestjs/common';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { EncryptionService } from './encryption.service';
import { BcryptService } from './bcrypt/bcrypt.service';

@Module({
  imports: [BcryptModule],
  providers: [EncryptionService, BcryptService],
  exports: [EncryptionService, BcryptService],
})
export class EncryptionModule {}
