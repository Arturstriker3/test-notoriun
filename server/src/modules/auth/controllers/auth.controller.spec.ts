import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { RequestCodeDto } from '../dtos/request-code.dto';
import { ValidateCodeDto } from '../dtos/validate-code.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    sendVerificationCode: jest.fn(),
    validateCode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('requestCode', () => {
    it('should send a verification code successfully', async () => {
      const requestCodeDto: RequestCodeDto = { email: 'test@example.com' };
      const mockResult = {
        messageUrl: 'https://example.com/message/12345',
      };

      mockAuthService.sendVerificationCode.mockResolvedValue(mockResult);

      const result = await authController.requestCode(requestCodeDto);
      expect(result).toEqual({
        message: 'Verification code sent',
        ...mockResult,
      });
      expect(mockAuthService.sendVerificationCode).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });

  describe('validateCode', () => {
    it('should validate the code successfully', () => {
      const validateCodeDto: ValidateCodeDto = {
        email: 'test@example.com',
        code: '123456',
      };

      mockAuthService.validateCode.mockReturnValue(true);

      const result = authController.validateCode(validateCodeDto);
      expect(result).toEqual({ message: 'Code validated successfully' });
      expect(mockAuthService.validateCode).toHaveBeenCalledWith(
        'test@example.com',
        '123456',
      );
    });

    it('should throw BadRequestException if the code is invalid', () => {
      const validateCodeDto: ValidateCodeDto = {
        email: 'test@example.com',
        code: '123456',
      };

      mockAuthService.validateCode.mockReturnValue(false);

      expect(() => authController.validateCode(validateCodeDto)).toThrow(
        BadRequestException,
      );
      expect(mockAuthService.validateCode).toHaveBeenCalledWith(
        'test@example.com',
        '123456',
      );
    });
  });

  describe('resendCode', () => {
    it('should resend a verification code successfully', async () => {
      const requestCodeDto: RequestCodeDto = { email: 'test@example.com' };
      const mockResult = {
        messageUrl: 'https://example.com/message/12345',
      };

      mockAuthService.sendVerificationCode.mockResolvedValue(mockResult);

      const result = await authController.resendCode(requestCodeDto);
      expect(result).toEqual({
        message: 'Verification code resent',
        ...mockResult,
      });
      expect(mockAuthService.sendVerificationCode).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });
});
