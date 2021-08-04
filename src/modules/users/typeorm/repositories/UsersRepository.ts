import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async findByName(nome: string): Promise<User | undefined> {
        const category = this.findOne({
            where: {
                nome,
            },
        });
        return category;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const category = this.findOne({
            where: {
                email,
            },
        });
        return category;
    }
    public async findById(id: string): Promise<User | undefined> {
        const category = this.findOne({
            where: {
                id,
            },
        });
        return category;
    }
}
