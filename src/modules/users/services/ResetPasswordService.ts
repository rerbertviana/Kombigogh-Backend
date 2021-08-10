import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import { hash } from 'bcryptjs';
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository ";


interface Irequest {
    token: string;
    senha: string;

}

class ResetPasswordService {

    public async execute({ token, senha }: Irequest): Promise<void> {
        
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token de usuário não existe.');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('Usuário não existe.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado.');
        }

        user.senha = await hash(senha, 8);

    }
}

export default ResetPasswordService;