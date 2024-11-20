import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves a list of all users.
   * Protected by AuthGuard for admin role.
   */
  @UseGuards(AuthGuard('admin'))
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  /**
   * Retrieves a user by ID.
   * @param userId The ID of the user to retrieve.
   */
  @UseGuards(AuthGuard('admin'))
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  /**
   * Creates a new user.
   * @param body The payload containing username, password, and optional role.
   */
  @Post('create')
  createUser(@Body() body: { username: string; password: string; role?: string }) {
    return this.usersService.createUser(body.username, body.password, body.role || 'viewer');
  }

  /**
   * Updates a user's role.
   * Protected by AuthGuard for admin role.
   * @param userId The ID of the user.
   * @param body The payload containing the new role.
   */
  @UseGuards(AuthGuard('admin'))
  @Put(':userId/role')
  updateUserRole(@Param('userId') userId: string, @Body() body: { role: string }) {
    return this.usersService.updateUserRole(userId, body.role);
  }

  /**
   * Deletes a user by ID.
   * Protected by AuthGuard for admin role.
   * @param userId The ID of the user to delete.
   */
  @UseGuards(AuthGuard('admin'))
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
