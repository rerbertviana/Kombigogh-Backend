import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";


class ListActiveProductService {

    public async execute(): Promise<Product[]> {

        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();

        const productsActives = products.filter(product => product.ativo == true && product.quantidade != 0)

        return productsActives;
    }
}

export default ListActiveProductService;