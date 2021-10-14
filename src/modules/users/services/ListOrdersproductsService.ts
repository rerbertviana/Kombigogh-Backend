import { Request, Response, Router } from 'express';
import ListProductUserService from '@modules/users/services/ListProductUserService';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { getMonth, getYear } from 'date-fns';


interface Irequest {
    user_id: string;
}

export default class ListOrdersproductsService {

    public async execute({ user_id }: Irequest): Promise <object | undefined> {


        const listproducts = new ListProductUserService();
        const ordersRepository = getCustomRepository(OrdersRepository);

        // Gerar todos os pedidos 
        const orders = await ordersRepository.find();

        // Listar todos os produtos por id do usuário com os dados do usuario.
        const listproductsUser = await listproducts.execute({ user_id });

        // Ver nome do usuário
        const nomeUser = await listproductsUser?.nome;

        // Setar apenas produtos do usuario sem os dados do usuario
        const products = listproductsUser?.product;

        // Uma lista com apenas os ids dos produtos 
        const productsIds = products?.map(product => product.id);

        // Setar array com qualquer tipagem.
        const productsSale: any[] = [];

        // Uma lista com apenas os ids dos pedidos
        const ordersIds = orders.map(order => order.id)

        // Laço para verificar quais produtos do usuario batem com os pedidos
        for (let i = 0; i < orders.length; i++) {

            // Selecionando o pedido especifico do array de pedidos 
            const order = await ordersRepository.findById(ordersIds[i]);
            // Setar a tabela pivô em order2
            const order2 = order?.order_products;

            //tirar do order2 o created_at
            // console.log(order2);

            // Condição de existência
            if (order2 && productsIds) {
                // for para varrer todos os ids dos produtos existentes em pedidos
                for (let y = 0; y < order2?.length; y++) {
                    // for para varrer todos ids dos produtos do usuario
                    for (let z = 0; z < productsIds.length; z++) {
                        // condição para comparar o id dos produtos dos pedidos com o id dos produtos do usuário
                        if (order2[y].product_id === productsIds[z]) {
                            // criando um array que vai conter os dados que batem com a condição
                            productsSale.push({
                                producteste: order2[y].product_id,
                                quanti: order2[y].quantidade,
                                orderId: order2[y].order_id,
                                orderPreco: order2[y].preco,
                                ordercreate: order2[y].created_at
                            });
                        }
                    }
                }
            }
        }

        // processo abaixo vai ser feito para pegar o nome do produto

        // pegando um repositório de produtos
        const productsRepository = getCustomRepository(ProductsRepository);

        // criando um array apenas com os ids dos produtos que foram vendidos
        const productsSaleId = productsSale.map(product => product.producteste)

        const p: any[] = [];

        //laço para pegar os produtos vendidos 
        for (let k = 0; k < productsSale.length; k++) {
            p.push(await productsRepository.findById(productsSaleId[k]));
        }

        // criar um objeto que contenha os dados para ser apresentados no relatório
        const resul = productsSale.map(product => ({
            pedido: product.orderId,
            id_produto: product.producteste,
            nome: p.filter(p => p.id === product.producteste)[0].nome,
            quantidade: product.quanti,
            mes: getMonth(product.ordercreate) + 1,
            ano: getYear(product.ordercreate)
        }));


        return resul;

        

    }

}