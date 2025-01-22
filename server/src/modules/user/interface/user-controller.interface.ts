import { User } from '../entities/user.entity';
import { GetUsersDto } from '../dtos/get-users.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUserController {
  /**
   * Creates a new user.
   * @param userData Data for the new user.
   * @returns The created user.
   */
  createUser(userData: CreateUserDto): Promise<User>;

  /**
   * Retrieves a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns The user with the given ID.
   */
  findUserById(id: string): Promise<User>;

  /**
   * Retrieves all users with pagination.
   * @param page The current page (default is 1).
   * @param limit The number of items per page (default is 10).
   * @returns A paginated list of users.
   */
  findAllUsers(page?: number, limit?: number): Promise<GetUsersDto>;

  /**
   * Updates an existing user by their unique identifier.
   * @param id The unique identifier of the user.
   * @param userData Data to update the user.
   * @returns The updated user.
   */
  updateUser(id: string, userData: UpdateUserDto): Promise<User>;

  /**
   * Deletes a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns void.
   */
  deleteUser(id: string): Promise<void>;
}
