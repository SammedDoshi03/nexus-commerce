import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { ProductDocument } from '../schemas/product.schema';

export abstract class IProductRepository extends GenericRepository<ProductDocument> {
  abstract updateStock(id: string, quantity: number): Promise<void>;
}
