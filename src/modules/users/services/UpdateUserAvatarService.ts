import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Irequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {

    public async execute({ user_id, avatarFilename }: Irequest): Promise<User> {
        
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);
        
       
    }
}

export default UpdateUserAvatarService;