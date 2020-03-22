import { IsString, Contains } from 'class-validator';

export class EncryptDataDto {
  @IsString()
  @Contains('bcrypt')
  encryption: string;

  @IsString()
  string: string;
}
