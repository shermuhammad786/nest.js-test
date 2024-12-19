/* eslint-disable prettier/prettier */


import { IsEmail, IsString } from 'class-validator';

export class verifyEmailDto {
  @IsEmail()
  @IsString()
  readonly email: string;
}