import { getMonth, getYear } from 'date-fns';
import ListOrderService from './ListOrderService';


interface IRequest {
    mes: string;
    ano: string;
}

class ListOrdersDataService {
    public async execute({ mes, ano }: IRequest): Promise<Object | undefined> {
        
        // listar todos os pedidos
        const listorders = new ListOrderService();
        const orders = await listorders.execute();

        // converter os valores recebidos em inteiros
        const orderMes = parseInt(mes);
        const orderAno = parseInt(ano);

        // filtrar os pedidos pela datas
        const ordersData = orders.filter(order => getMonth(order.created_at) === orderMes && getYear(order.created_at) === orderAno);

        return ordersData;
    }
}

export default ListOrdersDataService;