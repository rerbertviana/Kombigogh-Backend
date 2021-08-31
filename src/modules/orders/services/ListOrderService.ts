import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";


class ListOrderService {

    public async execute(): Promise<Order[]> {

        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();

        return orders;
    }
}

export default ListOrderService;