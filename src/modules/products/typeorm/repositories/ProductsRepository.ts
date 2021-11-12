import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";


interface IFindProducts {
    id: string;
}

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

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existentProducts = await this.find({
            where: {
                id: In(productIds),
            },
        });

        return existentProducts;
    }

    public async findByIdProduct(guardarvalores: string[]): Promise<Product[]> {

        const old_products = await this.find({
            where: {
                id: In(guardarvalores),
            },
        });

        return old_products;
    }


}

export default ProductsRepository;
