import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { isValidCnpj } from '../../shared/utils/cnpj-validator.util';

jest.mock('../repositories/user.repository');
jest.mock('../../shared/utils/cnpj-validator.util', () => ({
  isValidCnpj: jest.fn(),
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            findByCnpj: jest.fn(),
            findAllWithPagination: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: Partial<User> = {
        email: 'test@example.com',
        cnpj: '12345678000195',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      (isValidCnpj as jest.Mock).mockReturnValue(true);
      jest.spyOn(userRepository, 'create').mockResolvedValue({
        id: '1',
        ...userData,
      } as User);

      const result = await userService.createUser(userData);

      expect(result).toEqual({ id: '1', ...userData });
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(isValidCnpj).toHaveBeenCalledWith(userData.cnpj);
      expect(userRepository.create).toHaveBeenCalledWith(userData);
    });

    it('should throw ConflictException if email is already registered', async () => {
      const userData: Partial<User> = {
        email: 'test@example.com',
        cnpj: '12345678000195',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({} as User);

      await expect(userService.createUser(userData)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if CNPJ is invalid', async () => {
      const userData: Partial<User> = {
        email: 'test@example.com',
        cnpj: 'invalid-cnpj',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      (isValidCnpj as jest.Mock).mockReturnValue(false);

      await expect(userService.createUser(userData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const user: User = { id: '1', email: 'test@example.com' } as User;

      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

      const result = await userService.findUserById('1');

      expect(result).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(userService.findUserById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAllUsers', () => {
    it('should return paginated users', async () => {
      const users: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'test@example.com',
          userPhoneCode: '55',
          userPhone: '11987654321',
          cnpj: '12345678000195',
          institutionName: 'Test Institution',
          institutionPhoneCode: '55',
          institutionPhone: '1133445566',
          institutionEmail: 'contact@testinstitution.com',
          postalCode: '12345678',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Centro',
          address: 'Rua das Flores',
          number: '123',
          complement: 'Apto 45',
          location: {
            type: 'Point',
            coordinates: [12.3456, -45.6789],
          },
          createdAt: new Date('2023-01-01T00:00:00.000Z'),
          updatedAt: new Date('2023-01-02T00:00:00.000Z'),
        },
      ];
      const total = 1;

      jest
        .spyOn(userRepository, 'findAllWithPagination')
        .mockResolvedValue([users, total]);

      const result = await userService.findAllUsers({ page: 1, limit: 10 });

      expect(result).toEqual({
        data: users,
        total,
        page: 1,
        totalPages: 1,
      });
      expect(userRepository.findAllWithPagination).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        cnpj: '12345678000195',
      } as User;

      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
      jest.spyOn(userRepository, 'update').mockResolvedValue({
        ...user,
        email: 'updated@example.com',
      });

      const result = await userService.updateUser('1', {
        email: 'updated@example.com',
      });

      expect(result).toEqual({ ...user, email: 'updated@example.com' });
      expect(userRepository.update).toHaveBeenCalledWith('1', {
        email: 'updated@example.com',
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(
        userService.updateUser('1', { email: 'updated@example.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = { id: '1', email: 'test@example.com' } as User;

      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await userService.deleteUser('1');

      expect(userRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      await expect(userService.deleteUser('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
