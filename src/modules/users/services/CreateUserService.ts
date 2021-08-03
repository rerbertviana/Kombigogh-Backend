import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

interface Irequest {
    nome: string;
    email: string;
    senha: string;
    telefone: number;
}

class CreateUserService {
    public async execute({ nome, email, senha, telefone }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const usersNameExists = await usersRepository.findByName(nome);

        if (usersNameExists) {
            throw new AppError('Já existe um usuário com mesmo nome!');
        }

        const usersEmailExists = await usersRepository.findByEmail(email);

        if (usersEmailExists) {
            throw new AppError('Já existe um usuário com mesmo email!');
        }

        const hashedPassword = await hash(senha, 8);

        const user = usersRepository.create({
            nome,
            email,
            senha: hashedPassword,
            telefone,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;