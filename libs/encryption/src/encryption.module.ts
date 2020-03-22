import { Module } from '@nestjs/common';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [BcryptModule],
  providers: [EncryptionService],
})
export class EncryptionModule {}
