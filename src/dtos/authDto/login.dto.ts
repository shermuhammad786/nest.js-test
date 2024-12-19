/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}