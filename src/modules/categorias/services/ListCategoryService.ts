import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";


class ListCategoryService {

    public async execute(): Promise<Category[]> {

        const categoriesRepository = getCustomRepository(CategoriesRepository);
        const categories = categoriesRepository.find();
        

        return categories;
    }
}

export default ListCategoryService;