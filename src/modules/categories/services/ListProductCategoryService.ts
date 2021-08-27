import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";

interface IProduct {
    category_id: string;
}


class ListProductCategoryService {

    public async execute({ category_id }: IProduct): Promise<Category | undefined> {

        const productsRepository = getCustomRepository(CategoriesRepository);
        const products = productsRepository.findByProducts(category_id);

        return products;
    }
}

export default ListProductCategoryService;