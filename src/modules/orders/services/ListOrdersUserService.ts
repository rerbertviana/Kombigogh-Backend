import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface Irequest {
    user_id: string;
}


class ListOrdersStatusService {

    public async execute({ user_id }: Irequest): Promise<Object | undefined> {

        //pegar todos os orders
        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();

        // filtrar orders pelo usuario recebido
        const ordersusers = (await orders).filter(order => order.user_id === user_id);
       

        return ordersusers;
    }
}

export default ListOrdersStatusService;