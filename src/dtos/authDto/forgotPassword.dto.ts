/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from 'class-validator';

export class forgotPasswordDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;
}
