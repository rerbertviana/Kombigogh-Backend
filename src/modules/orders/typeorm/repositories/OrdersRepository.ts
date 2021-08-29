import User from '../../../users/typeorm/entities/User';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
    product_id: string;
    preco: number;
    quantidade: number;
}

interface IRequest {
    user: User;
    products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        const order = this.findOne(id, {
            relations: ['order_products', 'user'],
        });

        return order;
    }

    public async createOrder({ user, products }: IRequest): Promise<Order> {
        const order = this.create({
            user,
            order_products: products,
        });

        await this.save(order);

        return order;
    }
}

export default OrdersRepository;