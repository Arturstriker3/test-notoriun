import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly secret = process.env.SECRET_KEY ||
      'notoriun12345678987654321',
  ) {}

  async createVerificationCode(email: string): Promise<{ messageUrl: string }> {
    const validationCode = this.generateValidationCode();

    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ email, validationCode });
    } else {
      user.validationCode = validationCode;
    }
    await this.userRepository.save(user);

    const messageUrl = await this.sendValidationCode(email, validationCode);

    return { messageUrl };
  }

  async validateEmail(email: string, code: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email, validationCode: code },
    });

    if (!user) {
      return false;
    }

    // Invalida o código após validação
    user.validationCode = null;
    await this.userRepository.save(user);

    return true;
  }

  private generateValidationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
  }

  private async sendValidationCode(
    email: string,
    code: string,
  ): Promise<string> {
    // Criação do transporte Ethereal
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER, // Configurado no .env
        pass: process.env.ETHEREAL_PASS, // Configurado no .env
      },
    });

    // Envio do e-mail
    const info = await transporter.sendMail({
      from: '"Equipe Notoriun" <noreply@notoriun.com>', // Remetente
      to: email, // Destinatário
      subject: 'Seu código de validação', // Assunto
      text: `Seu código de validação é: ${code}. Ele tem duração de `, // Corpo do e-mail em texto simples
      html: `<p>Seu código de validação é: <strong>${code}</strong></p>`, // Corpo do e-mail em HTML
    });

    console.log('Mensagem enviada: %s', info.messageId);
    console.log(
      'URL para visualização: %s',
      nodemailer.getTestMessageUrl(info),
    );

    // Retorna a URL para visualizar o e-mail no Ethereal
    return nodemailer.getTestMessageUrl(info);
  }
}
