import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { config } from "process";

interface Irequest {
    email: string;
    senha: string;
}

interface Iresponse {
    users: User;
    token: string;
}



class CreateSessionService {
    public async execute({ email, senha, }: Irequest): Promise<Iresponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.findByEmail(email);

        if (!users) {
            throw new AppError('Usuário ou senha incorretos!', 401);
        }

        const passwordConfirmed = await compare(senha, users.senha);

        if (!passwordConfirmed) {
            throw new AppError('Usuário ou senha incorretos!', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: users.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            users,
            token,
        };
        
        
    }
}

export default CreateSessionService;