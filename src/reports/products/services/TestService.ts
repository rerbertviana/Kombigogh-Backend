import { Request, Response, Router } from 'express';
import ListProductsPDFService from './ListProductsPDFService';
import ShowProductsPDFService from './ListProductsUserPDFService';
import ProfileProductsController from '@modules/products/controllers/ProfileProductsController';
import ListProductUserService from '@modules/users/services/ListProductUserService';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { getMonth, getYear } from 'date-fns';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{

        const { user_id } = request.params;

        const listproducts = new ListProductUserService();
        const ordersRepository = getCustomRepository(OrdersRepository);
        
       // Gerar todos os pedidos 
        const orders = await ordersRepository.find();
 
        // Listar todos os produtos por id do usuário com os dados do usuario.
        const listproductsUser = await listproducts.execute({ user_id });

        // Setar apenas produtos do usuario sem os dados do usuario
        const products = listproductsUser?.product;

        // Uma lista com apenas os ids dos produtos 
        const productsIds = products?.map(product => product.id);
           
        // Setar array com qualquer tipagem.
        const teste: any[] = [];

       

        // Uma lista com apenas os ids dos pedidos
        const ordersIds = orders.map(order => order.id)

        // Laço para verificar quais produtos do usuario batem com os pedidos
        for (let i = 0; i < orders.length; i++){

            // Selecionando o pedido especifico do array de pedidos 
            const order = await ordersRepository.findById(ordersIds[i]);
            // Setar a tabela pivô em order2
            const order2 = order?.order_products;

            // Condição de existência
            if (order2 && productsIds) {
                // for para varrer todos os ids dos produtos existentes em pedidos
                for (let y = 0; y < order2?.length; y++) {
                    // for para varrer todos ids dos produtos do usuario
                    for (let z = 0; z < productsIds.length; z++) {
                        // condição para comparar o id dos produtos dos pedidos com oid dos produtos do usuário
                        if (order2[y].product_id === productsIds[z]) {
                            // criando um array que vai conter os dados que batem com a condição
                            teste.push({
                                producteste: order2[y].product_id,
                                quanti: order2[y].quantidade,
                                orderId: order2[y].order_id,
                                orderPreco: order2[y].preco
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
        const t = teste.map(teste => teste.producteste)

        const p: any[] = [];

        //laço para pegar os produtos vendidos 
        for (let k = 0; k < teste.length; k++) {
            p.push(await productsRepository.findById(t[k]));
        }

        // criar um objeto que contenha os dados para ser apresentados no relatório
        const resul = teste.map(product => ({
            id: product.producteste,
            nome: p.filter(p => p.id === product.producteste )[0].nome,
            quantidade: product.quanti,
            pedido: product.orderId
            }));
    
        // console.log(getYear(orders[0].created_at));
        // console.log(orders[0].created_at);

        const totalProduct = teste.map(product => product.quanti * product.orderPreco);

        let total = 0;

        if (totalProduct) {
            for (let i = 0; i < totalProduct.length; i++) {
                total = total + totalProduct[i];
            }
        }



        console.log(totalProduct);
       

    }

}