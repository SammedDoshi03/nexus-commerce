import { GenericRepository } from '../../core/abstracts/generic-repository.abstract';

export abstract class IProductRepository extends GenericRepository<any> {
    abstract updateStock(id: string, quantity: number): Promise<void>;
}
