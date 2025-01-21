import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      validationCode: this.generateValidationCode(),
    });

    await this.userRepository.save(user);

    await this.sendValidationCode(user.email, user.validationCode);

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateEmail(email: string, code: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email, validationCode: code },
    });

    if (!user) {
      return false;
    }

    user.validationCode = null;
    await this.userRepository.save(user);

    return true;
  }

  private generateValidationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async sendValidationCode(email: string, code: string): Promise<void> {
    console.log(`Enviando código ${code} para o email ${email}`);
  }
}
