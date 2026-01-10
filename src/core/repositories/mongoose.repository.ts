import { Model, Document } from 'mongoose';
import { IGenericRepository } from '../abstracts/generic-repository.abstract';

export class Helper {
  static toParams(filter: any) {
    if (!filter) return {};
    return filter;
  }
}

export abstract class MongooseRepository<
  T extends Document,
> implements IGenericRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: any): Promise<T> {
    const createdItem = new this.model(item);
    return createdItem.save();
  }

  async findAll(
    filter?: any,
    options?: { skip?: number; limit?: number },
  ): Promise<T[]> {
    const query = this.model.find(Helper.toParams(filter));
    if (options?.skip) {
      query.skip(options.skip);
    }
    if (options?.limit) {
      query.limit(options.limit);
    }
    return query.exec();
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOneBy(filter: any): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
