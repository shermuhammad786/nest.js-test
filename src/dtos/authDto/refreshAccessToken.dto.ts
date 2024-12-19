/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class refreshAccessToken {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
