import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Mock in-memory user storage
  private users = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
    { id: '2', username: 'editor', password: 'editor123', role: 'editor' },
    { id: '3', username: 'viewer', password: 'viewer123', role: 'viewer' },
  ];

  /**
   * Retrieves a list of all users.
   * @returns An array of all users.
   */
  getAllUsers(): any[] {
    return this.users.map((user) => {
      const { password, ...rest } = user; // Exclude passwords for security
      return rest;
    });
  }

  /**
   * Finds a user by their ID.
   * @param userId The ID of the user to find.
   * @returns The user object if found.
   */
  getUserById(userId: string): any {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...rest } = user; // Exclude password
    return rest;
  }

  /**
   * Creates a new user with the given username, password, and role.
   * @param username The desired username.
   * @param password The desired password.
   * @param role The user's role (default: 'viewer').
   * @returns The newly created user.
   */
  createUser(username: string, password: string, role: string = 'viewer'): any {
    if (this.users.some((user) => user.username === username)) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = {
      id: (this.users.length + 1).toString(),
      username,
      password,
      role,
    };
    this.users.push(newUser);
    const { password: _, ...rest } = newUser; // Exclude password from response
    return rest;
  }

  /**
   * Updates the role of an existing user.
   * @param userId The ID of the user.
   * @param role The new role to assign.
   * @returns The updated user object.
   */
  updateUserRole(userId: string, role: string): any {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.role = role;
    const { password, ...rest } = user; // Exclude password
    return rest;
  }

  /**
   * Deletes a user by their ID.
   * @param userId The ID of the user to delete.
   * @returns A success message.
   */
  deleteUser(userId: string): any {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.users.splice(index, 1);
    return { message: `User with ID ${userId} deleted successfully` };
  }

  /**
   * Finds a user by their username.
   * @param username The username of the user.
   * @returns The user object if found.
   */
  findByUsername(username: string): any {
    const user = this.users.find((u) => u.username === username);
    return user || null; // Return null if not found
  }
}
