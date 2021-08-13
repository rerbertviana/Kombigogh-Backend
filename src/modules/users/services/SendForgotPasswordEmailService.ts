import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository ';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email não cadastrado no sistema.');
        }

        const { token } = await userTokensRepository.generate(user.id);

        //console.log(token);

        await EtherealMail.sendMail({
            to: {
                name: user.nome,
                email: user.email,
            },
            subject: 'Recuperação de Senha',
            templateData: {
                template: `Olá {{name}}: {{token}}`,
                variables: {
                    name: user.nome,
                    token,
                },
            },
        });

    }
}

export default SendForgotPasswordEmailService;