import ListOrderUserService from "@modules/users/services/ListOrderUserService";
import { getMonth, getYear } from 'date-fns';


interface Irequest {
    user_id: string;
    ordermes: string;
    ano: string;
    status: string;
}


class ListOrdersUserDataStatusService {

    public async execute({ user_id, ordermes, ano, status}: Irequest): Promise<Object | undefined> {

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

        // filtrar pelo status
        const ordersStatus = ordersData.filter(order => order.status === status);

        return ordersStatus;
    }
}

export default ListOrdersUserDataStatusService;