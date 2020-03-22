import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { COMPARE_ROUTE, ERROR_ENCRYPTION_REQUIRED } from '../app.constant';
import { BcryptService } from '@encryption/encryption';
import { EncryptionService } from '@encryption/encryption/encryption.service';
import { CompareDataDto } from '../data/compare-data.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller(COMPARE_ROUTE)
export class CompareController {
  constructor(
    private readonly encryption: EncryptionService,
    private readonly bcrypt: BcryptService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async compare(@Body() data: CompareDataDto) {
    const compare = await this.encryption
      .setEncryption(this.bcrypt)
      .compare(data.string, data.hash);

    return { success: compare };
  }
}
