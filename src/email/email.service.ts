/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as pug from 'pug';
@Injectable()
export class EmailService {
    constructor(
        private readonly mailerMain: MailerMain,
    ) { }

    async sendMailSandBox(email: any): Promise<void> {
        const templeteFile = path.join(__dirname, email.templete);
        const render = this._bodytemplete(templeteFile, email.replacement);
        await this._processSendEmail(
            email.email,
            email.subject,
            email.text,
            render,
        );
    }

    _bodytemplete(templete: any, data: any) {
        return pug.renderFile(templete, { data });
    }

    async _processSendEmail(to, subject, text, body): Promise<void> {
        await this.mailerMain
            .sendMail({
                to: to,
                subject: subject,
                text: text,
                html: body,
            })
            .then(() => {
                console.log('Email sent');
            })
            .catch((e) => {
                console.log('Error sending email', e);
            });
    }
}
