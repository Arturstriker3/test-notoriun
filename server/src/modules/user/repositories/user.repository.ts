import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findByValidationCode(code: string): Promise<User | undefined> {
    return this.findOne({ where: { validationCode: code } });
  }
}
