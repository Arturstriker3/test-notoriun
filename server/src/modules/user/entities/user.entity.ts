import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    description: 'User phone code',
    example: '55',
  })
  @Column({ length: 2 })
  userPhoneCode: string;

  @ApiProperty({
    description: 'User phone',
    example: '991651234',
  })
  @Column({ length: 9 })
  userPhone: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
  })
  @Column({ length: 255, unique: true })
  email: string;

  @ApiProperty({
    description: 'Institution legal code',
    example: '123456',
  })
  @Column({ length: 14, nullable: false })
  cnpj: string;

  @ApiProperty({
    description: 'Institution name',
    example: '123456',
  })
  @Column({ length: 255, nullable: false })
  institutionName: string;

  @ApiProperty({
    description: 'Institution phone code',
    example: '55',
  })
  @Column({ length: 255, nullable: true })
  institutionPhoneCode: string;

  @ApiProperty({
    description: 'Institution phone',
    example: '991651234',
  })
  @Column({ length: 255, nullable: true })
  institutionPhone: string;

  @ApiProperty({
    description: 'Institution email',
    example: 'institutional@example.com',
  })
  @Column({ length: 255, nullable: true })
  institutionEmail: string;

  @ApiProperty({
    description: 'Institution postal code',
    example: 'www.institution.com',
  })
  @Column({ length: 8, nullable: false })
  postalCode: string;

  @ApiProperty({
    description: 'Institution state',
    example: 'São Paulo',
  })
  @Column({ length: 100, nullable: false })
  state: string;

  @ApiProperty({
    description: 'Institution city',
    example: 'São Paulo',
  })
  @Column({ length: 100, nullable: false })
  city: string;

  @ApiProperty({
    description: 'Institution neighborhood',
    example: 'Liberdade',
  })
  @Column({ length: 100, nullable: false })
  neighborhood: string;

  @ApiProperty({
    description: 'Institution address',
    example: 'Rua dos Bobos',
  })
  @Column({ length: 255, nullable: false })
  address: string;

  @ApiProperty({
    description: 'Institution address number',
    example: '0',
  })
  @Column({ length: 10, nullable: false })
  number: string;

  @ApiProperty({
    description: 'Institution address complement',
    example: 'AP 101',
  })
  @Column({ length: 255, nullable: false })
  complement: string;

  @ApiProperty({
    description: 'User location (latitude and longitude)',
    example: { type: 'Point', coordinates: [-46.633308, -23.55052] },
  })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: { type: 'Point'; coordinates: [number, number] };

  @ApiProperty({
    description: 'User created at',
    example: '2021-07-01T00:00:00.000',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'User updated at',
    example: '2021-07-01T00:00:00.000',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
