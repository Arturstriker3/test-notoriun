import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
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
