import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
}

class ActiveUserService {
    public async execute({user_id }: IRequest): Promise<User> {
        
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        user.ativo = true;
       

        await usersRepository.save(user);

        return user;
    }
}

export default ActiveUserService;
