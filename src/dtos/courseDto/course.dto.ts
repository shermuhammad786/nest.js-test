/* eslint-disable prettier/prettier */

import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CourseDto {


  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly activeStatus: string;
}
export class AddTeacherToCourseDto {


  @IsNotEmpty()
  @IsString()
  readonly courseId: string;

  @IsNotEmpty()
  @IsString()
  readonly teacherId: mongoose.Types.ObjectId;


}
export class UpdateCourseDto {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly activeStatus: string;
}
