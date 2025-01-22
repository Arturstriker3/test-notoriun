import { Controller, Post, Body, BadRequestException, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RequestCodeDto } from '../dtos/request-code.dto';
import { ValidateCodeDto } from '../dtos/validate-code.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-code')
  @ApiOperation({ summary: 'Send email verification code' })
  @ApiResponse({
    status: 201,
    description: 'Verification code sent successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'This email is already registered.',
  })
  @UsePipes(ValidationPipe)
  async requestCode(@Body() requestCodeDto: RequestCodeDto) {
    const { email } = requestCodeDto;

    const result = await this.authService.sendVerificationCode(email);
    return { message: 'Verification code sent', ...result };
  }

  @Post('validate-code')
  @ApiOperation({ summary: 'Validate email verification code' })
  @ApiResponse({ status: 200, description: 'Code validated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid verification code.' })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  validateCode(@Body() validateCodeDto: ValidateCodeDto) {
    const { email, code } = validateCodeDto;

    const isValid = this.authService.validateCode(email, code);
    if (!isValid) {
      throw new BadRequestException('Invalid verification code');
    }

    return { message: 'Code validated successfully' };
  }

  @Post('resend-code')
  @ApiOperation({ summary: 'Resend email verification code' })
  @ApiResponse({
    status: 201,
    description: 'Verification code resent successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'This email is already registered.',
  })
  @UsePipes(ValidationPipe)
  async resendCode(@Body() requestCodeDto: RequestCodeDto) {
    const { email } = requestCodeDto;

    const result = await this.authService.sendVerificationCode(email);
    return { message: 'Verification code resent', ...result };
  }
}
