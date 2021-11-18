import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
    product_id: string;
    quantidade: number;
    preco: number;
}

interface IRequest {
    user: string;
    products_array: IProduct[];
    cliente: string;
    status: string;
    total: number;
    pagamento:string;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        const order = await this.findOne(id, {
            relations: ['order_products', 'user'],
        });

        return order;
    }

    public async createOrder({ user, products_array, cliente, status, total, pagamento}: IRequest): Promise<Order> {
        const order = await this.create({
            user_id: user,
            order_products: products_array,
            cliente,
            status,
            total,
            pagamento
        });

        await this.save(order);

        return order;
    }

    public async findByIdOnly(id: string): Promise<Order | undefined> {
        const order = await this.findOne(id);
        
        return order;
    }
}

export default OrdersRepository;