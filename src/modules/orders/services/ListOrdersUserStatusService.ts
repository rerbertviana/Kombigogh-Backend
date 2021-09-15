import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface Irequest {
    user_id: string;
    status: string;
}


class ListOrdersUserStatusService {

    public async execute({ user_id, status}: Irequest): Promise<Object | undefined> {

        //pegar todos os orders
        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();

        // filtrar orders pelo usuario recebido
        const ordersusers = (await orders).filter(order => order.user_id === user_id);

        // filtrar pelo status
        const ordersStatus = ordersusers.filter(order => order.status === status);

        return ordersStatus;
    }
}

export default ListOrdersUserStatusService;