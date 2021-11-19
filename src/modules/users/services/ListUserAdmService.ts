import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


class ListUserAdmService {

    public async execute(): Promise<User[]> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = usersRepository.find();

        const userAdm = (await user).filter(user => user.nome != 'ADM');

        return userAdm;
    }
}

export default ListUserAdmService;