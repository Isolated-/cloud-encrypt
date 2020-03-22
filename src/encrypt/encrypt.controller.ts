import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EncryptionService } from '@encryption/encryption/encryption.service';
import { ENCRYPT_ROUTE } from '../app.constant';
import { BcryptService } from '@encryption/encryption';

@Controller(ENCRYPT_ROUTE)
export class EncryptController {
  constructor(
    private readonly service: EncryptionService,
    private readonly bcrypt: BcryptService,
  ) {}

  @Post()
  async encrypt(@Body() data) {
    if (data.encryption !== 'bcrypt') {
      throw new BadRequestException(
        'encryption type is required to be one of: bcrypt',
      );
    }

    // TODO: clean this up when more encryption methods are implemented
    return {
      success: true,
      value: await this.service.setEncryption(this.bcrypt).encrypt(data.string),
    };
  }
}
