import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return token', async () => {
      const req = { user: { email: 't@t.com' } };
      const result = { access_token: 'abc' };
      (authService.login as jest.Mock).mockResolvedValue(result);

      expect(await controller.login(req)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });

  describe('register', () => {
    it('should register user', async () => {
      const dto = { email: 't@t.com', password: '123' } as any;
      const result = { _id: '1', ...dto };
      (authService.register as jest.Mock).mockResolvedValue(result);

      expect(await controller.register(dto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(dto);
    });
  });
});
