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
       
        // filtrar os pedidos pela datas

        let ordersData: any[] = [];

        if (ordersorders) {
            ordersData = ordersorders.filter(order => getMonth(order.created_at) === orderMes && getYear(order.created_at) === orderAno);
        }

        // filtrar pelo status
        const ordersStatus = ordersData.filter(order => order.status === status);

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

export default ListOrdersUserDataStatusService;