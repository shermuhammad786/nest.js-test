/* eslint-disable prettier/prettier */

import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AssignmentDto {
  @IsNotEmpty()
  @IsString()
  readonly course: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsDate()
  readonly dueDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly submissions: [string];

}
export class AssignmentSubmitDto {

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly assignment: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly student: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly fileUrl: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  readonly grade: string;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  readonly feedback: string;
}
