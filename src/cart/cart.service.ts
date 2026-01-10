import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';
import { ICartRepository } from './interfaces/cart-repository.interface';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: ICartRepository,
    private productsService: ProductsService,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }
    return cart;
  }

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.getCart(userId);

    // Since getCart populates products, we need to handle that.
    const itemIndex = cart.items.findIndex((item: any) => {
      // Handle both populated and unpopulated cases safely
      const pId = item.product?._id
        ? item.product._id.toString()
        : item.product.toString();
      return pId === productId;
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Push product object or ID. Repository handles saving.
      cart.items.push({ product: product, quantity } as any);
    }

    // Using Mongoose update approach might differ, for repository pattern we should use update.
    // But since we modified the object, if it's a Mongoose Document, .save() works.
    // If it's pure generic, we might need to call update.
    // Assuming the repository returns a persisted entity that might have save() if it's an ActiveRecord (Mongoose Doc).
    // To be strictly generic, we should call this.cartRepository.update(cart._id, cart);

    // However, MongooseRepository returns T which extends Document. So .save() is available.
    // But to adhere to the abstraction, we should use update if we want to be pure.
    // For now, let's assume we can utilize the underlying mechanism or explicit update.
    const updatedCart = await this.cartRepository.update((cart as any)._id, {
      items: cart.items,
    });
    return this.getCart(userId);
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCart(userId);
    const newItems = cart.items.filter((item: any) => {
      const pId = item.product?._id
        ? item.product._id.toString()
        : item.product.toString();
      return pId !== productId;
    });

    await this.cartRepository.update((cart as any)._id, { items: newItems });
    return this.getCart(userId);
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getCart(userId);
    return this.cartRepository.update((cart as any)._id, {
      items: [],
    }) as Promise<Cart>;
  }
}
