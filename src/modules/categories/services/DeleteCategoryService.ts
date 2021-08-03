import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { CategoriesRepository } from "../typeorm/repositories/CategoriesRepository";

interface Irequest {
    id: string;
}

class DeleteCategoryService {
    public async execute({ id }: Irequest): Promise<void> {
        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const categories = await categoriesRepository.findOne(id);

        if (!categories) {
            throw new AppError('Usuário não encontrado');
        }

        await categoriesRepository.remove(categories);
    }
}

export default DeleteCategoryService;