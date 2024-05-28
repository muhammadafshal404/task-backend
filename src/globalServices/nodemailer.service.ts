import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeMailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: process.env.MAIL_NAME,
          address: process.env.MAIL_USER,
        },
      },
    );
  }

  async sendMail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}
