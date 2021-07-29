import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    name: string;
    email: string;
    senha: string;
    telefone: number;
}

class CreateUserService {
    public async execute({ name, email, senha, telefone }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const usersExists = await usersRepository.findByName(name);

        if (usersExists) {
            throw new AppError('Já existe um usuário com mesmo nome!');
        }

        const user = usersRepository.create({
            name,
            email,
            senha,
            telefone,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;