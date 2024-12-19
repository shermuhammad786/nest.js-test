/* eslint-disable prettier/prettier */

import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TeacherDto {
  @IsNotEmpty()
  @IsString()
  readonly roleId: string;

  @IsNotEmpty()
  @IsString()
  readonly course: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly activeStatus: string;
}
export class UpdateTeacherDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail({}, { message: 'Please put the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  readonly activeStatus: string;
}
