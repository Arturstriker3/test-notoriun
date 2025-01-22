import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCodeDto {
  @ApiProperty({
    description: 'The email address to validate the code.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  email: string;

  @ApiProperty({
    description: 'The verification code sent to the email.',
    example: '123456',
  })
  @IsString()
  @Length(6, 6, { message: 'The code must be exactly 6 characters long' })
  code: string;
}
