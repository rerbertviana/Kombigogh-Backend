import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";

interface Irequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: Irequest): Promise<void> {

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;