import User from "@modules/users/typeorm/entities/User";
import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";


@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    public async findByName(nome: string): Promise<Product | undefined> {
        const user = await this.findOne({
            where: {
                nome,
            },
        });
        return user;
    }

    public async findById(id: string): Promise<Product | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }


}

export default ProductsRepository;
