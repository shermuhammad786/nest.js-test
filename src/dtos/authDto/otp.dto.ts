/* eslint-disable prettier/prettier */

import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class otpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  readonly otpKey: string;

  @IsOptional()
  @IsString()
  @IsBoolean()
  readonly used: boolean;

  @IsOptional()
  @IsNumber()
  readonly expireIn: number;

  @IsOptional()
  @IsNumber()
  readonly expire: boolean;
}
