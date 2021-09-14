import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    product_id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    category_id: string;
}

class UpdateProductService {
    public async execute({ product_id, nome, descricao, preco, quantidade, category_id}: IRequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findById(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        const productUpdateName = await productsRepository.findByName(nome);

        if (productUpdateName && productUpdateName.id !== product_id) {
            throw new AppError('Já existe produto cadastrado com mesmo nome.');
        }

        const redisCache = new RedisCache();
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_CATEGORY');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_USER');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_USER_CATEGORY');

        product.nome = nome;
        product.descricao = descricao;
        product.preco = preco;
        product.quantidade = quantidade;
        product.category_id = category_id;


        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
