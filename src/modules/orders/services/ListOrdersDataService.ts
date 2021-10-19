import { getMonth, getYear } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
    mes: string;
    ano: string;
}

class ListOrdersDataService {
    public async execute({ mes, ano }: IRequest): Promise<Object | undefined> {
        
        // listar todos os pedidos
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

        // converter os valores recebidos em inteiros
        const orderMes = parseInt(mes);
        const orderAno = parseInt(ano);

        // filtrar os pedidos pela datas
        const ordersData = (await orders).filter(order => getMonth(order.created_at) === orderMes && getYear(order.created_at) === orderAno);

        //criar array com as informações que eu quero
        const resul = ordersData.map(ord => ({
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

export default ListOrdersDataService;