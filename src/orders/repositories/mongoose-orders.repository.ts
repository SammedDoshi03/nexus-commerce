import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { MongooseRepository } from '../../core/repositories/mongoose.repository';
import { IOrderRepository } from '../interfaces/order-repository.interface';

@Injectable()
export class MongooseOrdersRepository
  extends MongooseRepository<OrderDocument>
  implements IOrderRepository
{
  constructor(
    @InjectModel(Order.name) private orderModel_: Model<OrderDocument>,
  ) {
    super(orderModel_);
  }

  async findByUserId(userId: string): Promise<OrderDocument[]> {
    return this.orderModel_.find({ user: userId } as any).exec();
  }
}
