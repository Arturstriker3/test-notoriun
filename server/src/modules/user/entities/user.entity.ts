import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 2 })
  userPhoneCode: string;

  @Column({ length: 9 })
  userPhone: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 6 })
  validationCode: string;

  @Column({ length: 14, nullable: false })
  cnpj: string;

  @Column({ length: 255, nullable: false })
  institutionName: string;

  @Column({ length: 255, nullable: true })
  institutionPhoneCode: string;

  @Column({ length: 255, nullable: true })
  institutionPhone: string;

  @Column({ length: 255, nullable: true })
  institutionEmail: string;

  @Column({ length: 8, nullable: false })
  cep: string;

  @Column({ length: 100, nullable: false })
  state: string;

  @Column({ length: 100, nullable: false })
  city: string;

  @Column({ length: 100, nullable: false })
  neighborhood: string;

  @Column({ length: 255, nullable: false })
  address: string;

  @Column({ length: 10, nullable: false })
  number: string;

  @Column({ length: 255, nullable: false })
  complement: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
