import AppError from "@shared/errors/AppError";
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload';

interface Irequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserService {
    public async execute({ user_id, avatarFilename }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.findOne(user_id);

        if (!users) {
            throw new AppError('Usuário não encontrado.');
        }
        
        if (users.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, users.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            
            if (userAvatarFilePath) {
                await fs.promises.unlink(userAvatarFilePath);
            }

        }
        users.avatar = avatarFilename;

        await usersRepository.save(users);
        
        return users;
    }
}

export default UpdateUserService;