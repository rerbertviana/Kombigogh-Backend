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

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;