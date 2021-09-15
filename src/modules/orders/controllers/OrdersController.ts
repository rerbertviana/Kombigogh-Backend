import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import DisableOrderService from '../services/ReverseOrderService';
import DeleteOrderService from '../services/ReverseOrderService';
import ListOrderService from '../services/ListOrderService';
import ShowOrderService from '../services/ShowOrderService';
import ReverseOrderService from '../services/ReverseOrderService';
import ListOrdersDataService from '../services/ListOrdersDataService';
import ListOrdersStatusService from '../services/ListOrdersStatusService';
import ListOrderUserService from '@modules/users/services/ListOrderUserService';

export default class OrdersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({ id });

        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { cliente, products } = request.body;
        const user_id = request.user.id

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            user_id,
            products,
            cliente
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

        const listorders = new ListOrderUserService();

        const orders = await listorders.execute({ user_id });

        return response.json(orders);
    }
}