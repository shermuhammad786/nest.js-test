/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}
