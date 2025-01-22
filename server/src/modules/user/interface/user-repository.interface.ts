import { User } from '../entities/user.entity';

export interface IUserRepository {
  /**
   * Creates a new user.
   * @param user Data for the new user.
   * @returns The created user.
   */
  create(user: Partial<User>): Promise<User>;

  /**
   * Finds a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns The user with the given ID, or null if not found.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Finds a user by their email address.
   * @param email The email address of the user.
   * @returns The user with the given email, or null if not found.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Finds a user by their CNPJ.
   * @param cnpj The CNPJ of the user.
   * @returns The user with the given CNPJ, or null if not found.
   */
  findByCnpj(cnpj: string): Promise<User | null>;

  /**
   * Retrieves all users.
   * @returns A list of all users.
   */
  findAll(): Promise<User[]>;

  /**
   * Retrieves users with pagination.
   * @param offset The number of items to skip.
   * @param limit The number of items to retrieve.
   * @returns A tuple containing the list of users and the total count.
   */
  findAllWithPagination(
    offset: number,
    limit: number,
  ): Promise<[User[], number]>;

  /**
   * Updates a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @param user Data to update the user.
   * @returns The updated user.
   */
  update(id: string, user: Partial<User>): Promise<User>;

  /**
   * Deletes a user by their unique identifier.
   * @param id The unique identifier of the user.
   * @returns void.
   */
  delete(id: string): Promise<void>;
}
