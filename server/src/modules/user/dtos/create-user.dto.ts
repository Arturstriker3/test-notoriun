import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @Length(2, 2)
  userPhoneCode: string;

  @IsString()
  @Length(9, 9)
  userPhone: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(6, 6)
  validationCode: string;

  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @Length(1, 255)
  institutionName: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  institutionPhoneCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  institutionPhone?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  institutionEmail?: string;

  @IsString()
  @Length(8, 8)
  cep: string;

  @IsString()
  @Length(1, 100)
  state: string;

  @IsString()
  @Length(1, 100)
  city: string;

  @IsString()
  @Length(1, 100)
  neighborhood: string;

  @IsString()
  @Length(1, 255)
  address: string;

  @IsString()
  @Length(1, 10)
  number: string;

  @IsString()
  @Length(1, 255)
  complement: string;

  @IsNumberString()
  latitude: number;

  @IsNumberString()
  longitude: number;
}
