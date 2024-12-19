/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class studentSingUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly number: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;


  @IsNotEmpty()
  @IsString()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly qualification: string;


  @IsNotEmpty()
  @IsString()
  readonly laptop: string;

  @IsNotEmpty()
  @IsString()
  readonly course: string;

  @IsNotEmpty()
  @IsString()
  readonly roleId: string;
}
