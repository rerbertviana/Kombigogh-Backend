import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import { getMonth, getYear } from 'date-fns';


interface Irequest {
    user_id: string;
    status: string;
}


class ListOrdersUserStatusService {

    public async execute({ user_id, status}: Irequest): Promise<Object | undefined> {

        // pegar todos os orders
        const ordersRepository = getCustomRepository(OrdersRepository);
        const orders = ordersRepository.find();

        // setar meses 
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

        // filtrar orders pelo usuario recebido
        const ordersusers = (await orders).filter(order => order.user_id === user_id);

        // filtrar pelo status
        const ordersStatus = ordersusers.filter(order => order.status === status);

         //criar array com as informações que eu quero
         const resul = ordersStatus.map(ord => ({
            id: ord.id,
            cliente: ord.cliente,
            status: ord.status,
            total: ord.total,
            mes: meses.filter(p => p.id == getMonth(ord.created_at))[0].nome,
            ano: getYear(ord.created_at)
        }));

        return resul;
    }
}

export default ListOrdersUserStatusService;