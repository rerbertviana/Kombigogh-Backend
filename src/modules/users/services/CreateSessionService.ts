import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    email: string;
    senha: string;
}



class CreateSessionService {
    public async execute({ email, senha, }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findByEmail(email);

        if (!users) {
            throw new AppError('Usuário ou senha incorretos!');
        }

        const passwordConfirmed = await compare(senha, users.senha);

        if (!passwordConfirmed) {
            throw new AppError('Usuário ou senha incorretos!');
        }

        return users;
    }
}

export default CreateSessionService;