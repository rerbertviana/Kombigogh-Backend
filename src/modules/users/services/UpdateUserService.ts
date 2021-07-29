import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    id: string;
    name: string;
    email: string;
    senha: string;
    telefone: number;
}

class UpdateUserService {
    public async execute({ id,  name, email, senha, telefone }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const usersNameExists = await usersRepository.findByName(name);

        if (usersNameExists) {
            throw new AppError('Já existe um usuário com mesmo nome!');
        }

        const usersEmailExists = await usersRepository.findByName(email);

        if (usersEmailExists) {
            throw new AppError('Já existe um usuário com mesmo email!');
        }

        user.name = name;
        user.email = email;
        user.senha = senha;
        user.telefone = telefone;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;