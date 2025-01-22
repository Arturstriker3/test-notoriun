import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService = {
    findUserByEmail: jest.fn(),
  };

  const mockTransporter = {
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'test-message-id',
      envelope: { from: 'test@example.com', to: ['recipient@example.com'] },
      accepted: ['recipient@example.com'],
    }),
  };

  jest
    .spyOn(nodemailer, 'createTransport')
    .mockReturnValue(mockTransporter as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('sendVerificationCode', () => {
    it('should send a verification code successfully', async () => {
      const email = 'test@example.com';
      mockUserService.findUserByEmail.mockResolvedValue(null);

      const result = await authService.sendVerificationCode(email);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockTransporter.sendMail).toHaveBeenCalled();
      expect(result).toHaveProperty('messageUrl');
    });

    it('should throw BadRequestException if email is already registered', async () => {
      const email = 'test@example.com';
      mockUserService.findUserByEmail.mockResolvedValue({ id: 1, email });

      await expect(authService.sendVerificationCode(email)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateCode', () => {
    it('should return true if the code is valid', () => {
      const email = 'test@example.com';
      const code = '123456';

      jest
        .spyOn(authService as any, 'generateValidationCode')
        .mockReturnValue(code);

      const result = authService.validateCode(email, code);

      expect(result).toBe(true);
    });

    it('should return false if the code is invalid', () => {
      const email = 'test@example.com';
      const code = '123456';

      jest
        .spyOn(authService as any, 'generateValidationCode')
        .mockReturnValue('654321');

      const result = authService.validateCode(email, code);

      expect(result).toBe(false);
    });
  });

  describe('generateValidationCode', () => {
    it('should generate a valid 6-digit code', () => {
      const email = 'test@example.com';
      const result = authService['generateValidationCode'](email);

      expect(result).toMatch(/\d{6}/);
      expect(result.length).toBe(6);
    });

    it('should throw an error if the code is less than 6 digits', () => {
      jest.spyOn(crypto, 'createHmac').mockReturnValueOnce({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('abc'),
      } as any);

      expect(() =>
        authService['generateValidationCode']('test@example.com'),
      ).toThrow('Failed to generate a valid 6-digit code.');
    });
  });

  describe('sendEmailWithCode', () => {
    it('should send an email with the code and return the message URL', async () => {
      const email = 'test@example.com';
      const code = '123456';

      const result = await authService['sendEmailWithCode'](email, code);

      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: '"Equipe Notoriun" <noreply@notoriun.com>',
        to: email,
        subject: 'Seu código de validação',
        text: `Seu código de validação é: ${code}`,
        html: `<p>Seu código de validação é: <strong>${code}</strong></p>`,
      });
      expect(result).toBeDefined();
    });
  });
});
