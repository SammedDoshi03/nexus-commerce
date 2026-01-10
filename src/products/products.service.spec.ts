import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { IProductRepository } from './interfaces/product-repository.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: IProductRepository;

  const mockProductRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: IProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<IProductRepository>(IProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto = {
        title: 'Test',
        price: 100,
        description: 'Desc',
        imageUrl: 'url',
        stock: 10,
      };
      const result = { ...createProductDto, _id: '1' };
      mockProductRepository.create.mockResolvedValue(result);

      expect(await service.create(createProductDto)).toBe(result);
      expect(mockProductRepository.create).toHaveBeenCalledWith(
        createProductDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products with pagination', async () => {
      const result = [{ title: 'Test Product' }];
      mockProductRepository.findAll.mockResolvedValue(result);

      expect(await service.findAll(0, 10)).toBe(result);
      expect(mockProductRepository.findAll).toHaveBeenCalledWith(
        {},
        { skip: 0, limit: 10 },
      );
    });
  });

  describe('findOne', () => {
    it('should find a product by id', async () => {
      const result = { title: 'Test Product' };
      mockProductRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(
        'Product #1 not found',
      );
    });
  });

  describe('updateStock', () => {
    it('should update stock', async () => {
      mockProductRepository.updateStock.mockResolvedValue(undefined);
      await service.updateStock('1', -5);
      expect(mockProductRepository.updateStock).toHaveBeenCalledWith('1', -5);
    });
  });
});
