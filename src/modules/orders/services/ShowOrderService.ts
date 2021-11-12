import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import ProductsRepository from "../../products/typeorm/repositories/ProductsRepository";
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Object> {

        //exibir os pedidos pelo id
        const ordersRepository = getCustomRepository(OrdersRepository);
        const usersRepository = getCustomRepository(UsersRepository);
        const order = await ordersRepository.findById(id);
        

        //criar array com ids dos produtos
        const orderProducts = order?.order_products;
        const productsIds = orderProducts?.map(product => product.product_id);

        //setar constantes
        const products: any[] = [];
        const users: any[] = [];
        const teste: any[] = [];
        const resul: any[] = [];
        // const produtos: any[] = [];

        //com os ids dos produtos pegar conteudo de produtos em products
        const productsRepository = getCustomRepository(ProductsRepository);
        if (productsIds) {
            for (let i = 0; i < productsIds?.length; i++) {
                products.push(await productsRepository.findById(productsIds[i]));
            }
        }

        //com products separar o id de produto, nome e id de usuario
        for (let i = 0; i < products.length; i++) {
            teste.push({
                id: products[i].id,
                nome: products[i].nome,
                userid: products[i].user_id,

            })
        }
        
        //pegar apenas os ids de usuarios e colocar dados de users em users
        const userIds = teste.map(user => user.userid);
        for (let i = 0; i < userIds.length; i++) {
            users.push(await usersRepository.findById(userIds[i]));
        }

        //criar array com as respostas referentes os produtos
        const produtos = orderProducts?.map(product => ({
            nome: teste.filter(p => p.id == product.product_id)[0].nome,
            preco: product.preco,
            quantidade: product.quantidade,
            artista: users.filter(p => p.id == teste.filter(p2 => p2.id == product.product_id)[0].userid)[0].nome
        }));

        resul.push({
            id: order?.id,
            cliente: order?.cliente,
            vendedor: order?.user.nome,
            status: order?.status,
            total: order?.total,
        })
        
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