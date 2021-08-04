import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import authconfig from "@config/auth";


interface Irequest {
    email: string;
    senha: string;
}

interface Iresponse {
    user: User;
    token: string;
}


class CreateSessionsService {

    public async execute({ email, senha }: Irequest): Promise<Iresponse> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('email ou senha incorretas!', 401);
        }

        const passwordConfirmed = await compare(senha, user.senha);

        if (!passwordConfirmed) {
            throw new AppError('email ou senha incorretas!', 401);
        }

        const token = sign({}, authconfig.jwt.secret, {
            subject: user.id,
            expiresIn: authconfig.jwt.expiresIn,
        })

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;