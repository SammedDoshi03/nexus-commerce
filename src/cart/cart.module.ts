import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './schemas/cart.schema';
import { ProductsModule } from '../products/products.module';
import { ICartRepository } from './interfaces/cart-repository.interface';
import { MongooseCartRepository } from './repositories/mongoose-cart.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductsModule,
  ],
  providers: [
    CartService,
    {
      provide: ICartRepository,
      useClass: MongooseCartRepository
    }
  ],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule { }
