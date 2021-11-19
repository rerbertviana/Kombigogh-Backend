import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    product_id: string;
}

class DisableProductService {
    public async execute({ product_id }: IRequest): Promise<Product> {
        
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findById(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        product.ativo = false;

        await productsRepository.save(product);

        return product;
    }
}

export default DisableProductService;
