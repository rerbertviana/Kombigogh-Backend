import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Iproduct {
    user_id: string;
}


class ListProductUserService {

    public async execute({ user_id }: Iproduct): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByProducts(user_id);
       
        return user;
    }
}

export default ListProductUserService;