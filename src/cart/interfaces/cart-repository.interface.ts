import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { Cart } from '../schemas/cart.schema';

export abstract class ICartRepository extends GenericRepository<Cart> {
    abstract findByUserId(userId: string): Promise<Cart | null>;
}
