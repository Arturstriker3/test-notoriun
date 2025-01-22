import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'User phone code',
    example: '55',
  })
  @IsString()
  @Length(2, 2)
  userPhoneCode: string;

  @ApiProperty({
    description: 'User phone',
    example: '991651234',
  })
  @IsString()
  @Length(9, 9)
  userPhone: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Institution legal code',
    example: '123456',
  })
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @ApiProperty({
    description: 'Institution name',
    example: 'Example Institution',
  })
  @IsString()
  @Length(1, 255)
  institutionName: string;

  @ApiPropertyOptional({
    description: 'Institution phone code',
    example: '55',
  })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  institutionPhoneCode?: string;

  @ApiPropertyOptional({
    description: 'Institution phone',
    example: '991651234',
  })
  @IsOptional()
  @IsString()
  @Length(9, 9)
  institutionPhone?: string;

  @ApiPropertyOptional({
    description: 'Institution email',
    example: 'institutional@example.com',
  })
  @IsOptional()
  @IsEmail()
  institutionEmail?: string;

  @ApiProperty({
    description: 'Institution postal code',
    example: '12345678',
  })
  @IsString()
  @Length(8, 8)
  postalCode: string;

  @ApiProperty({
    description: 'Institution state',
    example: 'São Paulo',
  })
  @IsString()
  @Length(1, 100)
  state: string;

  @ApiProperty({
    description: 'Institution city',
    example: 'São Paulo',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: 'Institution neighborhood',
    example: 'Liberdade',
  })
  @IsString()
  @Length(1, 100)
  neighborhood: string;

  @ApiProperty({
    description: 'Institution address',
    example: 'Rua dos Bobos',
  })
  @IsString()
  @Length(1, 255)
  address: string;

  @ApiProperty({
    description: 'Institution address number',
    example: '0',
  })
  @IsString()
  @Length(1, 10)
  number: string;

  @ApiProperty({
    description: 'Institution address complement',
    example: 'AP 101',
  })
  @IsString()
  @Length(1, 255)
  complement: string;

  @ApiProperty({
    description: 'User latitude',
    example: -23.55052,
  })
  @IsNumber({}, { message: 'latitude must be a valid number.' })
  latitude: number;

  @ApiProperty({
    description: 'User longitude',
    example: -46.633308,
  })
  @IsNumber({}, { message: 'longitude must be a valid number.' })
  longitude: number;
}
