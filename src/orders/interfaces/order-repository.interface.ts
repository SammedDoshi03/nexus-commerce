import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';
import { Order } from '../schemas/order.schema';

export abstract class IOrderRepository extends GenericRepository<Order> {
    abstract findByUserId(userId: string): Promise<Order[]>;
}
