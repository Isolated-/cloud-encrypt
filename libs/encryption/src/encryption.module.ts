import { Module } from '@nestjs/common';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
})
export class EncryptionModule {}
