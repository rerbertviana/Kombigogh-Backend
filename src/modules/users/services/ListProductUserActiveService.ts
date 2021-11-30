import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface Iproduct {
    user_id: string;
}


class ListProductUserActiveService {

    public async execute({ user_id }: Iproduct): Promise<Object | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByProducts(user_id);
        const activeproducts = user?.product.filter(product => product.ativo == true && product.quantidade != 0)

        return activeproducts;
    }
}

export default ListProductUserActiveService;