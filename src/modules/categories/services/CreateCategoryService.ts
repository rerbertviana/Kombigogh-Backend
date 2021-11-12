import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";


interface Irequest {
    nome: string;
}

class CreateCategoryService {
    
    public async execute({ nome }: Irequest): Promise<Category> {
        const categoriesRepository = getCustomRepository(CategoriesRepository);
        const usersNameExists = await categoriesRepository.findByName(nome);

        if (usersNameExists) {
            throw new AppError('Já existe uma categoria cadastrada com mesmo nome!');
        }

        const category = categoriesRepository.create({
            nome,
        });

        await categoriesRepository.save(category);

        return category;
    }
}

export default CreateCategoryService;