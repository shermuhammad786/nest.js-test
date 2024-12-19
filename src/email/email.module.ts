/* eslint-disable prettier/prettier */
import { Logger, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, Logger],
  exports: [EmailService],
})
export class EmailModule { }
