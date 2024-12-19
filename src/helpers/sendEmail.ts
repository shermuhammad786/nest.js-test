/* eslint-disable prettier/prettier */

import { MailerService } from '@nestjs-modules/mailer';
export class sendEmail {
  constructor(private readonly mailService: MailerService) {}
  sendMail(email: string) {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }
}
