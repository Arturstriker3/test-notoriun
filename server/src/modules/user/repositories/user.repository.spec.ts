import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let typeOrmRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const repositoryMock = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn(),
      })),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    typeOrmRepository = module.get<Repository<User>>(
      getRepositoryToken(User),
    ) as jest.Mocked<Repository<User>>;
  });

  describe('create', () => {
    it('should save and return a user', async () => {
      const user = { email: 'test@example.com' } as User;
      typeOrmRepository.save.mockResolvedValue(user);

      const result = await userRepository.create(user);

      expect(result).toEqual(user);
      expect(typeOrmRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const user = { id: '1', email: 'test@example.com' } as User;
      typeOrmRepository.findOne.mockResolvedValue(user);

      const result = await userRepository.findById('1');

      expect(result).toEqual(user);
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findAllWithPagination', () => {
    it('should return users with pagination', async () => {
      const users = [{ id: '1', email: 'test@example.com' }] as User[];
      const total = 1;

      typeOrmRepository.createQueryBuilder.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([users, total]),
      } as any);

      const result = await userRepository.findAllWithPagination(0, 10);

      expect(result).toEqual([users, total]);
    });
  });

  describe('update', () => {
    it('should update a user and return it', async () => {
      const user = { id: '1', email: 'updated@example.com' } as User;

      typeOrmRepository.update.mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

      const result = await userRepository.update('1', {
        email: 'updated@example.com',
      });

      expect(result).toEqual(user);
      expect(typeOrmRepository.update).toHaveBeenCalledWith('1', {
        email: 'updated@example.com',
      });
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      typeOrmRepository.delete.mockResolvedValue(undefined);

      await userRepository.delete('1');

      expect(typeOrmRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
