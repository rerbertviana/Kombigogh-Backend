import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrderService from '../services/ListOrderService';
import ShowOrderService from '../services/ShowOrderService';

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
}