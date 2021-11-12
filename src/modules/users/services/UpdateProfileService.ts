import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    nome: string;
    email: string;
    senha?: string;
    telefone: string;
}

class UpdateProfileService {
    public async execute({user_id, nome, email, senha, telefone }: IRequest): Promise<User> {
        
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userUpdateName = await usersRepository.findByName(nome);

        if (userUpdateName && userUpdateName.id !== user_id) {
            throw new AppError('Já existe usuário cadastrado com mesmo nome.');
        }

        const userUpdateEmail = await usersRepository.findByEmail(email);

        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('Já existe um usuário cadastrado com esse email.');
        }
        
        if(senha)
        user.senha = await hash(senha, 8);
        user.nome = nome;
        user.email = email;
        user.telefone = telefone;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
