import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";


@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    
    public async findByName(nome: string): Promise<Product | undefined> {
        const product = await this.findOne({
            where: {
                nome,
            },
        });
        return product;
    }

    public async findById(id: string): Promise<Product | undefined> {
        const product = await this.findOne({
            where: {
                id,
            },
        });
        return product;
    }


}

export default ProductsRepository;
