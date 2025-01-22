import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class GetUsersDto {
  @ApiProperty({ type: [User], description: 'List of users' })
  data: User[];

  @ApiProperty({ description: 'Total number of users', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;
}
