import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";


interface Irequest {

    user_id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    category_id: string;

}

class CreateProductService {

    public async execute({ nome, user_id, descricao, preco, quantidade, category_id }: Irequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);
        const products = await productsRepository.findByName(nome);

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findById(user_id);

        if (products) {
            throw new AppError('Já existe um produto cadastrado com mesmo nome.');
        }

        const redisCache = new RedisCache();

        const product = productsRepository.create({
            user_id,
            nome,
            descricao,
            preco,
            quantidade,
            category_id
        });

        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_CATEGORY');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_USER');
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST_USER_CATEGORY');
        

        await productsRepository.save(product);
             
        return product;

    }
    
}

export default CreateProductService;