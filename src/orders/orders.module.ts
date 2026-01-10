import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { CartModule } from '../cart/cart.module';
import { ProductsModule } from '../products/products.module';
import { IOrderRepository } from './interfaces/order-repository.interface';
import { MongooseOrdersRepository } from './repositories/mongoose-orders.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
    ProductsModule,
  ],
  providers: [
    OrdersService,
    {
      provide: IOrderRepository,
      useClass: MongooseOrdersRepository,
    },
  ],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
