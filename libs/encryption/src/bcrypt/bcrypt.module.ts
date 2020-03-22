import * as bcrypt from 'bcrypt';
import { Module, DynamicModule } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [BcryptService],
  exports: [ConfigModule, BcryptService],
})
export class BcryptModule {}
