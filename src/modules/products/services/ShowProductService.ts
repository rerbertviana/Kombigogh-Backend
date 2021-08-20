import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";

interface Irequest {
    product_id: string;
}

class ShowProductService {
    public async execute({ product_id }: Irequest): Promise<Product | undefined> {

        const usersRepository = getCustomRepository(ProductsRepository);

        const product = await usersRepository.findOne(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado.');
        }

        return product;
    }
}

export default ShowProductService;