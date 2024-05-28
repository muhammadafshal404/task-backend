import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import generator from 'generate-password-ts';
import { UsersService } from '../../user/service/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { NodeMailerService } from 'src/globalServices/nodemailer.service';
import { renderWelcomeEmail } from 'src/utils/email-templates/welcome-email.template';
import { MESSAGES, WELCOME_EMAIL } from 'src/utils/constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly nodeMailerService: NodeMailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await this.validatePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async validateOldPassword(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOne(email);

    return user && (await this.validatePassword(password, user.password));
  }

  async login(user: any) {
    const payload = { email: user?.email, id: user?.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(token: string) {
    try {
      return await this.jwtService.decode(token.split('')[0]);
    } catch (err) {
      throw new ForbiddenException('Invalid JWT Token');
    }
  }
  private validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async createUser(body) {
    try {
      const { email } = body;
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      const user = await this.usersService.create({ email, password });

      await this.nodeMailerService.sendMail(
        user.email,
        WELCOME_EMAIL.SUBJECT,
        renderWelcomeEmail(`${process.env.FRONT_END}/login`, password),
      );
      return {
        message: MESSAGES.EMAIL_SENT,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
