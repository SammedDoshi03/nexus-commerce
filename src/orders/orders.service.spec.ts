import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { IOrderRepository } from './interfaces/order-repository.interface';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrdersRepository = {
    create: jest.fn(),
    findByUserId: jest.fn(),
  };

  const mockCartService = {
    getCart: jest.fn(),
    clearCart: jest.fn(),
  };

  const mockProductsService = {
    updateStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: IOrderRepository, useValue: mockOrdersRepository },
        { provide: CartService, useValue: mockCartService },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('createOrder', () => {
    it('should throw if cart is empty', async () => {
      mockCartService.getCart.mockResolvedValue({ items: [] });
      await expect(service.createOrder('u1')).rejects.toThrow('Cart is empty');
    });

    it('should create order and clear cart', async () => {
      const product = { _id: 'p1', price: 100 };
      const cart = { items: [{ product, quantity: 2 }] };
      const order = { _id: 'o1', totalAmount: 200 };

      mockCartService.getCart.mockResolvedValue(cart);
      mockOrdersRepository.create.mockResolvedValue(order);
      mockProductsService.updateStock.mockResolvedValue(undefined);
      mockCartService.clearCart.mockResolvedValue(undefined);

      const result = await service.createOrder('u1');

      expect(result).toBe(order);
      expect(mockProductsService.updateStock).toHaveBeenCalledWith('p1', -2);
      expect(mockCartService.clearCart).toHaveBeenCalledWith('u1');
    });
  });

  describe('findAll', () => {
    it('should return orders', async () => {
      const orders = [{ _id: 'o1' }];
      mockOrdersRepository.findByUserId.mockResolvedValue(orders);

      expect(await service.findAll('u1')).toBe(orders);
    });
  });
});
