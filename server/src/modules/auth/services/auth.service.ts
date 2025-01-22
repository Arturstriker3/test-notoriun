import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { UserService } from '../../user/services/user.service';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  private readonly secretKey =
    process.env.SECRET_KEY || 'notoriun12345678987654321';

  constructor(private readonly userService: UserService) {}

  async sendVerificationCode(email: string): Promise<{ messageUrl: string }> {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('This email is already registered.');
    }

    const validationCode = this.generateValidationCode(email);

    const messageUrl = await this.sendEmailWithCode(email, validationCode);

    return { messageUrl };
  }

  validateCode(email: string, code: string): boolean {
    const expectedCode = this.generateValidationCode(email);

    return expectedCode === code;
  }

  private generateValidationCode(email: string): string {
    const hash = crypto
      .createHmac('sha256', this.secretKey)
      .update(email)
      .digest('hex');

    const numericCode = hash.replace(/\D/g, '').slice(0, 6);

    if (numericCode.length < 6) {
      throw new Error('Failed to generate a valid 6-digit code.');
    }

    return numericCode;
  }

  private async sendEmailWithCode(
    email: string,
    code: string,
  ): Promise<string> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Equipe Notoriun" <noreply@notoriun.com>',
      to: email,
      subject: 'Seu código de validação',
      text: `Seu código de validação é: ${code}`,
      html: `<p>Seu código de validação é: <strong>${code}</strong></p>`,
    });

    console.log('Mensagem enviada: %s', info.messageId);
    console.log(
      'URL para visualização: %s',
      nodemailer.getTestMessageUrl(info),
    );

    return nodemailer.getTestMessageUrl(info);
  }
}
