import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Irequest {
    id: string;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}

class UpdateUserService {

    public async execute({ id, nome, email, senha, telefone }: Irequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        const usersNameExists = await usersRepository.findByName(nome);
        const user = await usersRepository.findOne(id);
        const usersEmailExists = await usersRepository.findByEmail(email);


        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }

        if (!usersNameExists) {

            if (!usersEmailExists) {

                const hashedPassword = await hash(senha, 8);


                user.nome = nome;
                user.email = email;
                user.senha = hashedPassword;
                user.telefone = telefone;

                await usersRepository.save(user);

                return user;

           }
            if (usersEmailExists.id != id) {
                throw new AppError('Já existe um email cadastrado com mesmo nome!');
            }

            const hashedPassword = await hash(senha, 8);

            user.nome = nome;
            user.email = email;
            user.senha = hashedPassword;
            user.telefone = telefone;

            await usersRepository.save(user);

            return user;

        }
        if (usersNameExists.id != id) {
            throw new AppError('Já existe usuário cadastrado com mesmo nome!');
        }

        if (usersNameExists.id = id) {

            if (!usersEmailExists) {

                const hashedPassword = await hash(senha, 8);

                user.nome = nome;
                user.email = email;
                user.senha = hashedPassword;
                user.telefone = telefone;

                await usersRepository.save(user);

                return user;

            }
            if (usersEmailExists.id != id) {
                throw new AppError('Já existe um email cadastrado com mesmo nome!');
            }

            const hashedPassword = await hash(senha, 8);

            user.nome = nome;
            user.email = email;
            user.senha = hashedPassword;
            user.telefone = telefone;

            await usersRepository.save(user);

            return user;
        }
        return user;
    }
}

export default UpdateUserService;