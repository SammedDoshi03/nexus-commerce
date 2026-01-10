import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = { title: 'T', price: 1 } as any;
      const result = { _id: '1', ...dto };
      (productsService.create as jest.Mock).mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(productsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should find all with default pagination', async () => {
      const result = [{ title: 'T' }];
      (productsService.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll('0', '10')).toBe(result);
      expect(productsService.findAll).toHaveBeenCalledWith(0, 10);
    });

    it('should find all with custom pagination', async () => {
      await controller.findAll('5', '20');
      expect(productsService.findAll).toHaveBeenCalledWith(5, 20);
    });
  });

  describe('findOne', () => {
    it('should find one by id', async () => {
      const result = { title: 'T' };
      (productsService.findOne as jest.Mock).mockResolvedValue(result);
      expect(await controller.findOne('1')).toBe(result);
    });
  });
});
