import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async findByName(nome: string): Promise<User | undefined> {
        const user = this.findOne({
            where: {
                nome,
            },
        });
        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.findOne({
            where: {
                email,
            },
        });
        return user;
    }
    public async findById(id: string): Promise<User | undefined> {
        const user = this.findOne({
            where: {
                id,
            },
        });
        return user;
    }
}
