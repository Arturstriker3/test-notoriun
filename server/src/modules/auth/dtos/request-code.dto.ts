import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestCodeDto {
  @ApiProperty({
    description: 'The email address where the verification code will be sent.',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  email: string;
}
