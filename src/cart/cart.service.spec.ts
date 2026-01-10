import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { ICartRepository } from './interfaces/cart-repository.interface';

describe('CartService', () => {
  let service: CartService;

  const mockCartRepository = {
    findByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockProductsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: ICartRepository, useValue: mockCartRepository },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  describe('getCart', () => {
    it('should return existing cart', async () => {
      const cart = { user: 'u1', items: [] };
      mockCartRepository.findByUserId.mockResolvedValue(cart);

      expect(await service.getCart('u1')).toBe(cart);
    });

    it('should create new cart if not exists', async () => {
      mockCartRepository.findByUserId.mockResolvedValue(null);
      const newCart = { user: 'u1', items: [], totalPrice: 0 };
      mockCartRepository.create.mockResolvedValue(newCart);

      expect(await service.getCart('u1')).toBe(newCart);
      expect(mockCartRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ user: 'u1' }),
      );
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const product = { _id: 'p1', price: 10 };
      const cart = { _id: 'c1', items: [] };
      const updatedCart = {
        _id: 'c1',
        items: [{ product: product, quantity: 1 }],
      };

      mockProductsService.findOne.mockResolvedValue(product);
      mockCartRepository.findByUserId.mockResolvedValue(cart);
      mockCartRepository.update.mockResolvedValue(undefined);
      // Second call to getCart returns updated cart
      mockCartRepository.findByUserId
        .mockResolvedValueOnce(cart)
        .mockResolvedValueOnce(updatedCart);

      const result = await service.addToCart('u1', 'p1', 1);
      expect(result).toBe(updatedCart);
      expect(mockCartRepository.update).toHaveBeenCalled();
    });

    it('should throw if product not found', async () => {
      mockProductsService.findOne.mockResolvedValue(null);
      await expect(service.addToCart('u1', 'p1', 1)).rejects.toThrow(
        'Product not found',
      );
    });
  });
  describe('removeFromCart', () => {
    it('should remove item', async () => {
      const cart = { items: [{ product: { _id: 'p1' }, quantity: 1 }] };
      const updatedCart = { items: [] };

      mockCartRepository.findByUserId.mockResolvedValue(cart);
      mockCartRepository.update.mockResolvedValue(undefined);
      mockCartRepository.findByUserId
        .mockResolvedValueOnce(cart)
        .mockResolvedValueOnce(updatedCart);

      const result = await service.removeFromCart('u1', 'p1');
      expect(result).toBe(updatedCart);
      expect(mockCartRepository.update).toHaveBeenCalled();
    });
  });
});
