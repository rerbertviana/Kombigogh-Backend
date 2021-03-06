import AppError from "@shared/errors/AppError";
import path from 'path';
import { getCustomRepository } from "typeorm";
import fs from 'fs';
import uploadConfig from '@config/upload';
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";

interface Irequest {
    product_id: string;
    avatarFilename: string;
}

class UpdateProductAvatarService {

    public async execute({ product_id, avatarFilename }: Irequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findById(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado.');
        }

        if (product.imagem) {

            const productAvatarFilePath = path.join(uploadConfig.directory, product.imagem);
            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath);

            if (productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFilePath);
            }
        }

        product.imagem = avatarFilename;

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductAvatarService;