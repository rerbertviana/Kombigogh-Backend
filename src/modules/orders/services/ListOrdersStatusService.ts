import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface Irequest {
    status: string;
}


class ListOrdersStatusService {

    public async execute({ status }: Irequest): Promise<Object | undefined> {

        //pegar todos os orders
        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();


        // filtrar orders pelo status recebido
        const ordersStatus = (await orders).filter(order => order.status === status);

        return ordersStatus;
    }
}

export default ListOrdersStatusService;