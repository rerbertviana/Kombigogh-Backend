import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";


interface Irequest {
    id: string;
}

class ShowCategoryService {
    public async execute({ id }: Irequest): Promise<Category | undefined> {
        
        const  categoriesRepository = getCustomRepository(CategoriesRepository);

        const categories = await categoriesRepository.findOne(id);
        
        if (!categories) {
            throw new AppError('Usuário não encontrado');
        }

        return categories;
    }
}

export default ShowCategoryService ;