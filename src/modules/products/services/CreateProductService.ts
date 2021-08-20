import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";


interface Irequest {

    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;

}

class CreateProductService {

    public async execute({ nome, descricao, preco, quantidade }: Irequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);
        const productsNameExists = await productsRepository.findByName(nome);

        if (productsNameExists) {
            throw new AppError('Já existe um produto cadastrado com mesmo nome.');
        }



        const product = productsRepository.create({
            nome,
            descricao,
            preco,
            quantidade,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;