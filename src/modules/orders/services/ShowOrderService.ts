import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import ProductsRepository from "../../products/typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Object> {

        //exibir os pedidos pelo id
        const ordersRepository = getCustomRepository(OrdersRepository);
        const order = await ordersRepository.findById(id);

        //criar array com ids dos produtos
        const orderProducts = order?.order_products;
        const productsIds = orderProducts?.map(product => product.product_id);

        //setar constantes
        const products: any[] = [];
        const teste: any[] = [];
        const resul: any[] = [];

        //produtos
        const productsRepository = getCustomRepository(ProductsRepository);
        if (productsIds) {
            for (let i = 0; i < productsIds?.length; i++) {
                products.push(await productsRepository.findById(productsIds[i]));
            }
        }

        for (let i = 0; i < products.length; i++) {
            teste.push({
                id: products[i].id,
                nome: products[i].nome,
            })   
        }
        
        resul.push({
            id: order?.id,
            cliente: order?.cliente,
            vendedor: order?.user.nome,
            status: order?.status,
            total: order?.total
        })

        const produtos = orderProducts?.map(product => ({
            nome: teste.filter(p => p.id == product.product_id)[0].nome,
            preco: product.preco,
            quantidade: product.quantidade
        }));

        resul.push({
            produtos: produtos
        });

        if (!order) {
            throw new AppError('Pedido não encontrado.');
        }

        return resul;
    }
}

export default ShowOrderService;