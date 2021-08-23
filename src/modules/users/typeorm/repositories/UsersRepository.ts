import Product from "@modules/products/typeorm/entities/Product";
import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";



@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async findByName(nome: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                nome,
            },
        });
        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });
        return user;
    }
    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }
    public async createProductUser(product_id: Product[]): Promise<User> {
        const user = this.create({
            product: product_id,
        });

        await this.save(user);
        return user;
    }
}
