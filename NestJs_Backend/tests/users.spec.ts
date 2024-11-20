import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { UsersController } from '../src/users/users.controller';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a user', () => {
    const newUser = usersService.createUser('testuser', 'password123', 'viewer');
    expect(newUser).toEqual({
      id: '1',
      username: 'testuser',
      role: 'viewer',
    });
  });

  it('should throw an error if username already exists', () => {
    usersService.createUser('testuser', 'password123', 'viewer');
    expect(() => usersService.createUser('testuser', 'password456', 'editor')).toThrow(
      new HttpException('Username already exists', HttpStatus.BAD_REQUEST),
    );
  });

  it('should retrieve all users without passwords', () => {
    usersService.createUser('user1', 'password123', 'viewer');
    usersService.createUser('user2', 'password456', 'admin');

    const users = usersService.getAllUsers();
    expect(users).toHaveLength(2);
    expect(users).toEqual([
      { id: '1', username: 'user1', role: 'viewer' },
      { id: '2', username: 'user2', role: 'admin' },
    ]);
  });

  it('should retrieve a user by ID', () => {
    usersService.createUser('user1', 'password123', 'viewer');
    const user = usersService.getUserById('1');
    expect(user).toEqual({ id: '1', username: 'user1', role: 'viewer' });
  });

  it('should throw an error if user is not found by ID', () => {
    expect(() => usersService.getUserById('nonexistent')).toThrow(
      new HttpException('User not found', HttpStatus.NOT_FOUND),
    );
  });

  it('should update a user role', () => {
    usersService.createUser('user1', 'password123', 'viewer');
    const updatedUser = usersService.updateUserRole('1', 'admin');
    expect(updatedUser).toEqual({ id: '1', username: 'user1', role: 'admin' });
  });

  it('should throw an error when updating role of nonexistent user', () => {
    expect(() => usersService.updateUserRole('nonexistent', 'admin')).toThrow(
      new HttpException('User not found', HttpStatus.NOT_FOUND),
    );
  });

  it('should delete a user by ID', () => {
    usersService.createUser('user1', 'password123', 'viewer');
    const response = usersService.deleteUser('1');
    expect(response).toEqual({ message: 'User with ID 1 deleted successfully' });

    const users = usersService.getAllUsers();
    expect(users).toHaveLength(0);
  });

  it('should throw an error when deleting nonexistent user', () => {
    expect(() => usersService.deleteUser('nonexistent')).toThrow(
      new HttpException('User not found', HttpStatus.NOT_FOUND),
    );
  });
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should retrieve all users via controller', () => {
    jest.spyOn(usersService, 'getAllUsers').mockReturnValue([
      { id: '1', username: 'user1', role: 'viewer' },
    ]);

    const result = usersController.getAllUsers();
    expect(result).toEqual([{ id: '1', username: 'user1', role: 'viewer' }]);
  });

  it('should retrieve a user by ID via controller', () => {
    jest.spyOn(usersService, 'getUserById').mockReturnValue({
      id: '1',
      username: 'user1',
      role: 'viewer',
    });

    const result = usersController.getUserById('1');
    expect(result).toEqual({ id: '1', username: 'user1', role: 'viewer' });
  });

  it('should create a user via controller', () => {
    jest.spyOn(usersService, 'createUser').mockReturnValue({
      id: '1',
      username: 'user1',
      role: 'viewer',
    });

    const result = usersController.createUser({
      username: 'user1',
      password: 'password123',
      role: 'viewer',
    });

    expect(result).toEqual({ id: '1', username: 'user1', role: 'viewer' });
  });

  it('should update a user role via controller', () => {
    jest.spyOn(usersService, 'updateUserRole').mockReturnValue({
      id: '1',
      username: 'user1',
      role: 'admin',
    });

    const result = usersController.updateUserRole('1', { role: 'admin' });
    expect(result).toEqual({ id: '1', username: 'user1', role: 'admin' });
  });

  it('should delete a user via controller', () => {
    jest.spyOn(usersService, 'deleteUser').mockReturnValue({
      message: 'User with ID 1 deleted successfully',
    });

    const result = usersController.deleteUser('1');
    expect(result).toEqual({ message: 'User with ID 1 deleted successfully' });
  });
});
