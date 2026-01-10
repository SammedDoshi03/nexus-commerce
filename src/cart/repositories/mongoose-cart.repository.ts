import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { MongooseRepository } from '../../core/repositories/mongoose.repository';
import { ICartRepository } from '../interfaces/cart-repository.interface';

@Injectable()
export class MongooseCartRepository extends MongooseRepository<CartDocument> implements ICartRepository {
    constructor(@InjectModel(Cart.name) private cartModel_: Model<CartDocument>) {
        super(cartModel_);
    }

    async findByUserId(userId: string): Promise<CartDocument | null> {
        return this.cartModel_.findOne({ user: userId } as any).populate('items.product').exec();
    }
}
