import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IEncryption } from '../interface/encryption.interface';

@Injectable()
export class BcryptService implements IEncryption {
  private rounds: number;

  constructor(private readonly config: ConfigService) {
    this.rounds = config.get<number>('BCRYPT_HASH_ROUNDS');
  }

  async encrypt(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plain, encrypted);
  }
}
