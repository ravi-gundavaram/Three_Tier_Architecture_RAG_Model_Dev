import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates the user by checking the username and password.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns The validated user if credentials are correct.
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Handles login by validating the user and generating a JWT token.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns An object containing the access token.
   */
  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Registers a new user by delegating to the UsersService.
   * @param username The desired username.
   * @param password The desired password.
   * @returns The newly created user.
   */
  async register(username: string, password: string): Promise<any> {
    const user = await this.usersService.createUser(username, password);
    return user;
  }
}
