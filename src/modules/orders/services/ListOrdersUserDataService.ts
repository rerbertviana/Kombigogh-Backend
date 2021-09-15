import ListOrderUserService from "@modules/users/services/ListOrderUserService";
import { getMonth, getYear } from 'date-fns';


interface Irequest {
    user_id: string;
    ordermes: string;
    ano: string;
}


class ListOrdersUserDataService {

    public async execute({ user_id, ordermes, ano }: Irequest): Promise<Object | undefined> {

        // pegando pedidos pelo usuario
        const listOrders = new ListOrderUserService();
        const orders = await listOrders.execute({ user_id });

        // converter os valores recebidos em inteiros
        const orderMes = parseInt(ordermes);
        const orderAno = parseInt(ano);


        const ordersorders = orders?.order;
        // filtrar os pedidos pela datas

        let ordersData: any[] = [];

        if (ordersorders) {
            ordersData = ordersorders.filter(order => getMonth(order.created_at) === orderMes && getYear(order.created_at) === orderAno);
        }

        return ordersData;
    }
}

export default ListOrdersUserDataService;