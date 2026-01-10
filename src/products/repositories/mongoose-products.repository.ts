import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { MongooseRepository } from '../../core/repositories/mongoose.repository';
import { IProductRepository } from '../interfaces/product-repository.interface';

@Injectable()
export class ProductsRepository
  extends MongooseRepository<ProductDocument>
  implements IProductRepository
{
  constructor(
    @InjectModel(Product.name) private productModel_: Model<ProductDocument>,
  ) {
    super(productModel_);
  }
  async updateStock(id: string, quantity: number): Promise<void> {
    // quantity can be negative to decrease stock
    await this.productModel_.findByIdAndUpdate(id, {
      $inc: { stock: quantity },
    });
  }
}
