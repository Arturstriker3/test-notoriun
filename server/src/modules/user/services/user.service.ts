import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }
    return this.userRepository.create(userData);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);
    return this.userRepository.update(user.id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.delete(user.id);
  }
}
