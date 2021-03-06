import ProductsRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface Irequest {
    id: string;
}

class ReverseOrderService {
    public async execute({ id }: Irequest): Promise<void> {

        const ordersRepository = getCustomRepository(OrdersRepository);

        const orderVerify = await ordersRepository.findByIdOnly(id);
        
        if (orderVerify && orderVerify.status == "Estornado") {

            throw new AppError("Esse pedido já foi estornado.");
            
        }

        const order = await ordersRepository.findById(id);

        const productsRepository = getCustomRepository(ProductsRepository);

        if (!order) {
            throw new AppError('Pedido não encontrado.');
        }
        
        const { order_products } = order;

        const guardarvalores = order_products.map(product => product.product_id);

        const old_products = await productsRepository.findByIdProduct(guardarvalores);

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantidade:
                old_products.filter(p => p.id === product.product_id)[0].quantidade + product.quantidade
        }));
        
        order.status = "Estornado"

        const redisCache = new RedisCache();
        await redisCache.invalidate('api-kombigogh-PRODUCT_LIST');

        await productsRepository.save(updatedProductQuantity);

        await ordersRepository.save(order);

    }
}

export default ReverseOrderService;