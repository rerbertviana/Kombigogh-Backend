import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrderService from '../services/ListOrderService';
import ShowOrderService from '../services/ShowOrderService';
import ReverseOrderService from '../services/ReverseOrderService';
import ListOrdersDataService from '../services/ListOrdersDataService';
import ListOrdersStatusService from '../services/ListOrdersStatusService';
import ListOrdersUserDataService from '../services/ListOrdersUserDataService';
import ListOrdersUserDataStatusService from '../services/ListOrdersUserDataStatusService';
import ListOrdersUserStatusService from '../services/ListOrdersUserStatusService';
import ListOrdersUserService from '../services/ListOrdersUserService';
import ListOrdersDataStatusService from '../services/ListOrdersDataStatusService';

export default class OrdersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({ id });

        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { cliente, products, pagamento } = request.body;
        const user_id = request.user.id

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            user_id,
            products,
            cliente,
            pagamento
        });

        return response.json(order);
    }

    public async index(request: Request, response: Response): Promise<Response> {

        const listorders = new ListOrderService();

        const orders = await listorders.execute();

        return response.json(orders);
    }

    public async reverse(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const reverseOrders = new ReverseOrderService();

        await reverseOrders.execute({ id });

        return response.json([]);
    }

    public async ordersdata(request: Request, response: Response): Promise<Response> {
        const { mes, ano } = request.params;

        const listOrderData = new ListOrdersDataService();

        const orders = await listOrderData.execute({ mes, ano });

        return response.json(orders);
    }

    public async ordersstatus(request: Request, response: Response): Promise<Response> {
        const { status } = request.params;

        const listorders = new ListOrdersStatusService();

        const orders = await listorders.execute({ status });

        return response.json(orders);
    }

    public async orderuser(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const listorders = new ListOrdersUserService();

        const orders = await listorders.execute({ user_id });

        return response.json(orders);
    }

    public async orderuserdata(request: Request, response: Response): Promise<Response> {
        const { user_id, ordermes, ano } = request.params;

        const listorders = new ListOrdersUserDataService();

        const orders = await listorders.execute({ user_id, ordermes, ano });

        return response.json(orders);
    }

    public async orderuserdatastatus(request: Request, response: Response): Promise<Response> {
        const { user_id, ordermes, ano, status} = request.params;

        const listorders = new ListOrdersUserDataStatusService();

        const orders = await listorders.execute({ user_id, ordermes, ano, status });

        return response.json(orders);
    }

    public async orderuserstatus(request: Request, response: Response): Promise<Response> {
        const { user_id, status } = request.params;

        const listorders = new ListOrdersUserStatusService();

        const orders = await listorders.execute({ user_id, status });

        return response.json(orders);
    }

    public async ordersdatastatus(request: Request, response: Response): Promise<Response> {
        const { ordermes, ano, status } = request.params;

        const listorders = new ListOrdersDataStatusService();

        const orders = await listorders.execute({ ordermes, ano, status });

        return response.json(orders);
    }
}