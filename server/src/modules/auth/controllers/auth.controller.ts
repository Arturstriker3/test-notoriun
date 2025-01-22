import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RequestCodeDto } from '../dtos/request-code.dto';
import { ValidateCodeDto } from '../dtos/validate-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-code')
  async requestCode(@Body() requestCodeDto: RequestCodeDto) {
    const { email } = requestCodeDto;

    const result = await this.authService.sendVerificationCode(email);
    return { message: 'Verification code sent', ...result };
  }

  @Post('validate-code')
  validateCode(@Body() validateCodeDto: ValidateCodeDto) {
    const { email, code } = validateCodeDto;

    const isValid = this.authService.validateCode(email, code);
    if (!isValid) {
      throw new BadRequestException('Invalid verification code');
    }

    return { message: 'Code validated successfully' };
  }

  @Post('resend-code')
  async resendCode(@Body() requestCodeDto: RequestCodeDto) {
    const { email } = requestCodeDto;

    const result = await this.authService.sendVerificationCode(email);
    return { message: 'Verification code resent', ...result };
  }
}
