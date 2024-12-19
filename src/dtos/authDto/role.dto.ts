/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class roleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly permission: string;
}
