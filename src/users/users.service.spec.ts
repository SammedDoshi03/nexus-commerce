import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUserRepository } from './interfaces/user-repository.interface';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: IUserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should hash password and create user', async () => {
      const dto = { email: 't@t.com', password: 'plain', firstName: 'f', lastName: 'l' };
      // We assume bcrypt is working, testing that repository.create is called with a hashed password (not plain)
      mockUserRepository.create.mockImplementation((user) => Promise.resolve({ ...user, _id: '1' }));

      const result = await service.create(dto);

      expect(result).toBeDefined();
      expect(result.passwordHash).not.toBe('plain');
      expect(mockUserRepository.create).toHaveBeenCalled();
    });
  });

  describe('findOneByEmail', () => {
    it('should return user', async () => {
      const user = { email: 't@t.com' };
      mockUserRepository.findOneByEmail.mockResolvedValue(user);
      expect(await service.findOneByEmail('t@t.com')).toBe(user);
    });
  });
});
