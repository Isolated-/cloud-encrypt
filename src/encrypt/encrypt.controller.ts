import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { EncryptionService } from '@encryption/encryption/encryption.service';
import { ENCRYPT_ROUTE, ERROR_ENCRYPTION_REQUIRED } from '../app.constant';
import { BcryptService } from '@encryption/encryption';
import { EncryptDataDto } from '../data/encrypt-data.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller(ENCRYPT_ROUTE)
export class EncryptController {
  constructor(
    private readonly service: EncryptionService,
    private readonly bcrypt: BcryptService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async encrypt(@Body() data: EncryptDataDto) {
    // TODO: clean this up when more encryption methods are implemented
    return {
      success: true,
      value: await this.service.setEncryption(this.bcrypt).encrypt(data.string),
    };
  }
}
