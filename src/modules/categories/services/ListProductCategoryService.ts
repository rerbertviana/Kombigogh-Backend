import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";
import RedisCache from '@shared/cache/RedisCache';


interface IProduct {
    category_id: string;
}


class ListProductCategoryService {

    public async execute({ category_id }: IProduct): Promise<Category | undefined > {

        const productsRepository = getCustomRepository(CategoriesRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Category>('api-kombigogh-PRODUCT_LIST_CATEGORY',);

        if (!products) {
            products = await productsRepository.findByProducts(category_id);
            await redisCache.save('api-kombigogh-PRODUCT_LIST_CATEGORY', products);
        }
        
        return products;
    }
}

export default ListProductCategoryService;