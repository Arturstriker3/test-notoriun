import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { GetUsersDto } from '../dtos/get-users.dto';
import { Point } from 'geojson';
import { User } from '../entities/user.entity';

jest.mock('../services/user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: CreateUserDto = {
        name: 'Teste Boo',
        email: 'teste@teste.com',
        userPhoneCode: '55',
        userPhone: '11999999999',
        cnpj: '91277445000179',
        institutionName: 'Example Institution',
        institutionPhoneCode: '55',
        institutionPhone: '1133445566',
        institutionEmail: 'contact@example.com',
        postalCode: '12345678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        address: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        location: {
          type: Point,
          coordinates: [12.3456, -45.6789],
        },
      };

      const createdUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: userData.name,
        email: userData.email,
        userPhoneCode: userData.userPhoneCode,
        userPhone: userData.userPhone,
        cnpj: userData.cnpj,
        institutionName: userData.institutionName,
        postalCode: userData.postalCode,
        state: userData.state,
        city: userData.city,
        neighborhood: userData.neighborhood,
        address: userData.address,
        number: userData.number,
        complement: userData.complement,
        location: userData.location,
        institutionPhoneCode: '55',
        institutionPhone: '1133445566',
        institutionEmail: 'contact@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);

      expect(await userController.createUser(userData)).toEqual(createdUser);
      expect(userService.createUser).toHaveBeenCalledWith(userData);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const user: User = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        userPhoneCode: '55',
        userPhone: '11999999999',
        cnpj: '12345678000195',
        institutionName: 'Example Institution',
        institutionPhoneCode: '55',
        institutionPhone: '1133445566',
        institutionEmail: 'contact@example.com',
        postalCode: '12345678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        address: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        location: {
          type: Point,
          coordinates: [12.3456, -45.6789],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findUserById').mockResolvedValue(user);

      expect(await userController.findUserById(userId)).toEqual(user);
      expect(userService.findUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAllUsers', () => {
    it('should return paginated users', async () => {
      const query = { page: 1, limit: 10 };
      const paginatedUsers: GetUsersDto = {
        total: 1,
        page: query.page,
        totalPages: 1,
        data: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'John Doe',
            email: 'john.doe@example.com',
            userPhoneCode: '55',
            userPhone: '11999999999',
            cnpj: '12345678000195',
            institutionName: 'Example Institution',
            institutionPhoneCode: '55',
            institutionPhone: '1133445566',
            institutionEmail: 'contact@example.com',
            postalCode: '12345678',
            state: 'SP',
            city: 'São Paulo',
            neighborhood: 'Centro',
            address: 'Rua das Flores',
            number: '123',
            complement: 'Apto 45',
            location: {
              type: Point,
              coordinates: [12.3456, -45.6789],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(paginatedUsers);

      expect(
        await userController.findAllUsers(query.page, query.limit),
      ).toEqual(paginatedUsers);
      expect(userService.findAllUsers).toHaveBeenCalledWith(query);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData: UpdateUserDto = {
        name: 'Jane Doe',
        userPhoneCode: '55',
        userPhone: '11987654321',
        email: 'jane.doe@example.com',
        cnpj: '98765432000123',
        institutionName: 'Updated Institution',
        postalCode: '12345678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        address: 'Rua Nova',
        number: '456',
        complement: 'Apto 78',
        location: {
          type: Point,
          coordinates: [12.3456, -45.6789],
        },
      };

      const updatedUser: User = {
        id: userId,
        name: 'Jane Doe',
        userPhoneCode: '55',
        userPhone: '11987654321',
        email: 'jane.doe@example.com',
        cnpj: '98765432000123',
        institutionName: 'Updated Institution',
        institutionPhoneCode: '55',
        institutionPhone: '1133445566',
        institutionEmail: 'contact@updatedinstitution.com',
        postalCode: '12345678',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        address: 'Rua Nova',
        number: '456',
        complement: 'Apto 78',
        location: {
          type: Point,
          coordinates: [12.3456, -45.6789],
        },
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      };

      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      expect(await userController.updateUser(userId, updateData)).toEqual(
        updatedUser,
      );
      expect(userService.updateUser).toHaveBeenCalledWith(userId, updateData);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';

      jest.spyOn(userService, 'deleteUser').mockResolvedValue(undefined);

      expect(await userController.deleteUser(userId)).toBeUndefined();
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
