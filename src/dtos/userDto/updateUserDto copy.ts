/* eslint-disable prettier/prettier */

import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly activeStatus: string;
}
