import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetUsersDto } from '../dtos/get-users.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findUserById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users paginated' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Current page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of users',
    type: GetUsersDto,
  })
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.findAllUsers({ page, limit });
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: Partial<User>) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
