/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';


@Controller('email')
export class EmailController {
    constructor(private readonly emailServerService: EmailService) { }

    @Post('test')
    testEMail(@Body() createEmailServerDto) {
        return this.emailServerService.sendMailSandBox(createEmailServerDto);
    }
}
