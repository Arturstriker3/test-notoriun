import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findAllWithPagination(
    offset: number,
    limit: number,
  ): Promise<[User[], number]> {
    const [users, total] = await this.repository
      .createQueryBuilder('user')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return [users, total];
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
