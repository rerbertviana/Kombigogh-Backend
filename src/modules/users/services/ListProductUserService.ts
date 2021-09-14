import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import RedisCache from '@shared/cache/RedisCache';


interface Iproduct {
    user_id: string;
}


class ListProductUserService {

    public async execute({ user_id }: Iproduct): Promise<User | undefined> {

        const usersRepository = getCustomRepository(UsersRepository);

        const redisCache = new RedisCache();

        let user = await redisCache.recover<User>('api-kombigogh-PRODUCT_LIST_USER',);

        if (!user) {
            user = await usersRepository.findByProducts(user_id);
            await redisCache.save('api-kombigogh-PRODUCT_LIST_USER', user);
        }
       
        return user;
    }
}

export default ListProductUserService;