import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { isValidCnpj } from '../../shared/utils/cnpj-validator.util';
import { IUserService } from '../interface/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    if (!isValidCnpj(userData.cnpj)) {
      throw new ConflictException('Invalid CNPJ');
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

  async findUserByCnpj(cnpj: string): Promise<User | null> {
    return this.userRepository.findByCnpj(cnpj);
  }

  async findAllUsers(pagination: { page: number; limit: number }) {
    const { page, limit } = pagination;

    const offset = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAllWithPagination(
      offset,
      limit,
    );

    return {
      data: users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);

    if (userData.cnpj && !isValidCnpj(userData.cnpj)) {
      throw new ConflictException('Invalid CNPJ');
    }

    if (userData.cnpj) {
      const existingUserWithCnpj = await this.userRepository.findByCnpj(
        userData.cnpj,
      );
      if (existingUserWithCnpj && existingUserWithCnpj.id !== user.id) {
        throw new ConflictException(
          'CNPJ is already registered to another user',
        );
      }
    }

    if (userData.email) {
      const existingUserWithEmail = await this.userRepository.findByEmail(
        userData.email,
      );
      if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
        throw new ConflictException(
          'Email is already registered to another user',
        );
      }
    }

    return this.userRepository.update(user.id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.delete(user.id);
  }
}
