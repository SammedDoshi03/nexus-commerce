import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { IOrderRepository } from './interfaces/order-repository.interface';

@Injectable()
export class OrdersService {
    constructor(
        private ordersRepository: IOrderRepository,
        private cartService: CartService,
        private productsService: ProductsService,
    ) { }

    async createOrder(userId: string): Promise<Order> {
        const cart = await this.cartService.getCart(userId);
        if (!cart.items.length) {
            throw new BadRequestException('Cart is empty');
        }

        let totalAmount = 0;
        const items = [];

        for (const item of cart.items) {
            const product = (item as any).product;
            const price = product.price;
            totalAmount += price * item.quantity;
            items.push({
                product: product._id,
                quantity: item.quantity,
                price
            });
            // Update stock
            await this.productsService.updateStock(product._id, -item.quantity);
        }

        const paymentId = await this.processPayment(totalAmount);

        const order = await this.ordersRepository.create({
            user: userId,
            items,
            totalAmount,
            status: 'paid',
            paymentId,
        });

        await this.cartService.clearCart(userId);
        return order;
    }

    private async processPayment(amount: number): Promise<string> {
        // Simulate external payment gateway interacton (Stripe, PayPal, etc.)
        return 'txn_' + Math.random().toString(36).substring(7);
    }

    async findAll(userId: string): Promise<Order[]> {
        return this.ordersRepository.findByUserId(userId);
    }
}
