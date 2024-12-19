/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}
