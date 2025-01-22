import { User } from '../entities/user.entity';

export interface IUserService {
  /**
   * Creates a new user.
   * @param userData Data for the new user.
   * @returns The created user.
   */
  createUser(userData: Partial<User>): Promise<User>;

  /**
   * Retrieves a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns The user with the given ID.
   */
  findUserById(id: string): Promise<User>;

  /**
   * Retrieves a user by their email address.
   * @param email The email address of the user.
   * @returns The user with the given email, or null if not found.
   */
  findUserByEmail(email: string): Promise<User | null>;

  /**
   * Retrieves a user by their CNPJ.
   * @param cnpj The CNPJ of the user.
   * @returns The user with the given CNPJ, or null if not found.
   */
  findUserByCnpj(cnpj: string): Promise<User | null>;

  /**
   * Retrieves all users with pagination.
   * @param pagination Pagination parameters: page and limit.
   * @returns A paginated list of users, including total count and total pages.
   */
  findAllUsers(pagination: { page: number; limit: number }): Promise<{
    data: User[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Updates an existing user by their unique identifier.
   * @param id The unique identifier of the user.
   * @param userData Data to update the user.
   * @returns The updated user.
   */
  updateUser(id: string, userData: Partial<User>): Promise<User>;

  /**
   * Deletes a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns void.
   */
  deleteUser(id: string): Promise<void>;
}
