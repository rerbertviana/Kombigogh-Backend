import { EntityRepository, Repository } from "typeorm";
import Category from "../entities/Category";

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
    public async findByName(nome: string): Promise<Category | undefined> {
        const category = this.findOne({
            where: {
                nome,
            },
        });
        return category;
    }
}
