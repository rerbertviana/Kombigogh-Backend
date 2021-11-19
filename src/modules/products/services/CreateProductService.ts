import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";


interface Irequest {

    user_id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    category_id: string;

}

class CreateProductService {

    public async execute({ nome, user_id, descricao, preco, quantidade, category_id }: Irequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);
        const products = await productsRepository.findByName(nome);

        if (products) {
            throw new AppError('Já existe um produto cadastrado com mesmo nome.');
        }

        const product = productsRepository.create({
            user_id,
            nome,
            descricao,
            preco,
            quantidade,
            category_id,
            ativo: true
            
        });
        
        await productsRepository.save(product);
             
        return product;

    }
    
}

export default CreateProductService;