import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { IProductRepository } from './interfaces/product-repository.interface';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: IProductRepository) { }

    async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
        return this.productsRepository.create(createProductDto);
    }

    async findAll(skip = 0, limit = 10): Promise<ProductDocument[]> {
        return this.productsRepository.findAll({}, { skip, limit });
    }

    async findOne(id: string): Promise<ProductDocument> {
        const product = await this.productsRepository.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async updateStock(id: string, quantity: number): Promise<void> {
        return this.productsRepository.updateStock(id, quantity);
    }
}
