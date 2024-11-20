import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockJwtToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate user with correct credentials', async () => {
    jest.spyOn(usersService, 'findByUsername').mockResolvedValue({
      id: '1',
      username: 'testuser',
      password: 'password123',
      role: 'viewer',
    });

    const result = await authService.validateUser('testuser', 'password123');
    expect(result).toEqual({ id: '1', username: 'testuser', role: 'viewer' });
  });

  it('should return null for invalid credentials', async () => {
    jest.spyOn(usersService, 'findByUsername').mockResolvedValue({
      id: '1',
      username: 'testuser',
      password: 'password123',
      role: 'viewer',
    });

    const result = await authService.validateUser('testuser', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('should login and return a JWT token', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue({
      id: '1',
      username: 'testuser',
      role: 'viewer',
    });

    const result = await authService.login('testuser', 'password123');
    expect(result).toEqual({ accessToken: 'mockJwtToken' });
  });

  it('should throw an error for login with invalid credentials', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(authService.login('testuser', 'wrongpassword')).rejects.toThrow(
      'Unauthorized',
    );
  });
});

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockJwtToken'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should login via controller and return a JWT token', async () => {
    jest.spyOn(authService, 'login').mockResolvedValue({
      accessToken: 'mockJwtToken',
    });

    const result = await authController.login({
      username: 'testuser',
      password: 'password123',
    });

    expect(result).toEqual({ accessToken: 'mockJwtToken' });
  });

  it('should register a user via controller', async () => {
    jest.spyOn(authService, 'register').mockResolvedValue({
      id: '1',
      username: 'testuser',
      role: 'viewer',
    });

    const result = await authController.register({
      username: 'testuser',
      password: 'password123',
    });

    expect(result).toEqual({
      id: '1',
      username: 'testuser',
      role: 'viewer',
    });
  });
});
