import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";


interface Irequest {
    id: string;
    nome: string;
}

class UpdateCategoryService {

    public async execute({ id, nome }: Irequest): Promise<Category> {

        const categoriesRepository = getCustomRepository(CategoriesRepository);
        const usersNameExists = await categoriesRepository.findByName(nome);
        const categories = await categoriesRepository.findOne(id)

        if (!categories) {
            throw new AppError('Categoria não encontrada!');
        }

        if (!usersNameExists) {

            categories.nome = nome;

            await categoriesRepository.save(categories);

            return categories;
            
        }

        if (usersNameExists.id != id) {
            throw new AppError('Já existe uma categoria cadastrada com mesmo nome!');
        }

        return categories;
    }
}

export default UpdateCategoryService;