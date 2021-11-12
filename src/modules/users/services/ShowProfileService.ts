import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    user_id: string;
}

class ShowProfileService {
    public async execute({ user_id }: Irequest): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        return user;
    }
}

export default ShowProfileService;