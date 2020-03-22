import { Injectable } from '@nestjs/common';
import { IEncryption } from './interface/encryption.interface';

@Injectable()
export class EncryptionService {
  private encryption: IEncryption;

  setEncryption(encryption: IEncryption) {
    this.encryption = encryption;
    return this;
  }

  encrypt(plain: string) {
    return this.encryption.encrypt(plain);
  }

  compare(plain: string, encrypted: string) {
    return this.encryption.compare(plain, encrypted);
  }
}
