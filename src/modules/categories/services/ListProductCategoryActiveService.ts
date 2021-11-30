import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";

interface IProduct {
    category_id: string;
}


class ListProductCategoryActiveService {

    public async execute({ category_id }: IProduct): Promise<Object | undefined> {

        const productsRepository = getCustomRepository(CategoriesRepository);
        const products = await productsRepository.findByProducts(category_id);

        const activeproducts = products?.product.filter(product => product.ativo == true && product.quantidade != 0)

        return activeproducts;
    }
}

export default ListProductCategoryActiveService;