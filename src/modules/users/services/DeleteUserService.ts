import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: Irequest): Promise<void> {
        
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        await usersRepository.remove(user);
    }
}

export default DeleteUserService;