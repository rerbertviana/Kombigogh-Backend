import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
    id: string;
    quantidade: number;
}

interface IRequest {
    user_id: string;
    products: IProduct[];
    cliente: string;
}

class CreateOrderService {
    public async execute({ user_id, products, cliente}: IRequest): Promise<Order> {
        
        const ordersRepository = getCustomRepository(OrdersRepository);
        const usersRepository = getCustomRepository(UsersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const userExists = await usersRepository.findById(user_id);

        if (!userExists) {
            throw new AppError('nã foi possível encontrar o usuário.');
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError('Não foi possível encontrar esses produtos.');
        }

        const existsProductsIds = existsProducts.map(product => product.id);


        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );


        if (checkInexistentProducts.length) {
            throw new AppError(
                `Não foi possível encontrar o produto ${checkInexistentProducts[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantidade <
                product.quantidade,
        );


        if (quantityAvailable.length) {
            throw new AppError(
            `A quantidade ${quantityAvailable[0].quantidade} não está disponível para esse produto: ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantidade: product.quantidade,
            preco: existsProducts.filter(p => p.id === product.id)[0].preco,
        }));


        const order = await ordersRepository.createOrder({
            user: user_id,
            products_array: serializedProducts,
            cliente,
            status: "ok",
        })
        
        const { order_products } = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantidade:
                existsProducts.filter(p => p.id === product.product_id)[0].quantidade -
                product.quantidade,
        }));

        await productsRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;