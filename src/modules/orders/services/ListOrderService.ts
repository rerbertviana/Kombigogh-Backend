import { getMonth, getYear } from 'date-fns';
import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";


class ListOrderService {

    public async execute(): Promise<Object[]> {

        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();

        const meses: any[] = [];

        meses.push(
            {
                id: 0,
                nome: 'JANEIRO'
            },
            {
                id: 1,
                nome: 'FEVEREIRO'
            },
            {
                id: 2,
                nome: 'MARÇO'
            },
            {
                id: 3,
                nome: 'ABRIL'
            },
            {
                id: 4,
                nome: 'MAIO'
            },
            {
                id: 5,
                nome: 'JUNHO'
            },
            {
                id: 6,
                nome: 'JULHO'
            },
            {
                id: 7,
                nome: 'AGOSTO'
            },
            {
                id: 8,
                nome: 'SETEMBRO'
            },
            {
                id: 9,
                nome: 'OUTUBRO'
            },
            {
                id: 10,
                nome: 'NOVEMBRO'
            },
            {
                id: 11,
                nome: 'DEZEMBRO'
            },
        );

        const ordersData = (await orders).map(ord => ({
            id: ord.id,
            cliente: ord.cliente,
            status: ord.status,
            total: ord.total,
            mes: meses.filter(p => p.id == getMonth(ord.created_at))[0].nome,
            ano: getYear(ord.created_at)
        }));

        return ordersData;
    }
}

export default ListOrderService;