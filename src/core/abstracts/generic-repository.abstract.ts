export interface IGenericRepository<T> {
    create(item: T | any): Promise<T>;
    findAll(filter?: any, options?: { skip?: number; limit?: number }): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export abstract class GenericRepository<T> implements IGenericRepository<T> {
    abstract create(item: T | any): Promise<T>;
    abstract findAll(filter?: any, options?: { skip?: number; limit?: number }): Promise<T[]>;
    abstract findOne(id: string): Promise<T | null>;
    abstract update(id: string, item: Partial<T>): Promise<T | null>;
    abstract delete(id: string): Promise<boolean>;
}
