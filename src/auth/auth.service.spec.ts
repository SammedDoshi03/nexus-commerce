import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user data if valid', () => {
      // Removed async
      const user = {
        _id: '1',
        email: 'test@test.com',
        passwordHash: 'hash',
        toObject: jest
          .fn()
          .mockReturnValue({ _id: '1', email: 'test@test.com' }),
      };
      // ...
    });
  });

  describe('login', () => {
    it('should return access token', () => {
      // Removed async
      const user = { _id: '1', email: 'a@b.com', role: 'user' };
      mockJwtService.sign.mockReturnValue('token');

      const result = service.login(user); // Removed await
      expect(result).toEqual({ access_token: 'token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user._id,
        role: user.role,
      });
    });
  });

  describe('register', () => {
    it('should create user', async () => {
      const dto = { email: 'a@b.com', password: '123' } as any;
      const result = { _id: '1', ...dto };
      mockUsersService.create.mockResolvedValue(result);

      expect(await service.register(dto)).toBe(result);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });
});
