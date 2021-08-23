import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository";
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

}

class CreateProductService {

    public async execute({ nome, user_id, descricao, preco, quantidade }: Irequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);
        const products = await productsRepository.findByName(nome);

        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findById(user_id);


        if (products) {
            throw new AppError('Já existe um produto cadastrado com mesmo nome.');
        }
        

        const product = productsRepository.create({
            user_id,
            nome,
            descricao,
            preco,
            quantidade,
        });

        await productsRepository.save(product);
 
        if (users) {
            await usersRepository.createProductUser([product]);
        }        
            
        return product;
    }
    
}

export default CreateProductService;