import { IsString, Contains } from 'class-validator';

export class CompareDataDto {
  @IsString({ always: true })
  @Contains('bcrypt')
  encryption: string;

  @IsString({ always: true })
  string: string;

  @IsString({ always: true })
  hash: string;
}
