import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    product_id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
}

class UpdateProductService {
    public async execute({ product_id, nome, descricao, preco, quantidade }: IRequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findById(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        const productUpdateName = await productsRepository.findByName(nome);

        if (productUpdateName && productUpdateName.id !== product_id) {
            throw new AppError('Já existe usuário cadastrado com mesmo nome.');
        }


        product.nome = nome;
        product.descricao = descricao;
        product.preco = preco;
        product.quantidade = quantidade;


        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
