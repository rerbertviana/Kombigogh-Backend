import { Request, Response, Router } from 'express';
import ListProductsPDFService from './ListProductsPDFService';
import ShowProductsPDFService from './ListProductsUserPDFService';
import ProfileProductsController from '@modules/products/controllers/ProfileProductsController';
import ListProductCategoryService from '@modules/categories/services/ListProductCategoryService';
import ListProductUserService from '@modules/users/services/ListProductUserService';
import ListOrderService from '@modules/orders/services/ListOrderService';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import Order from '@modules/orders/typeorm/entities/Order';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{

        const { user_id } = request.params;

        const listproducts = new ListProductUserService();
        const ordersRepository = getCustomRepository(OrdersRepository);
        
       
        const orders = await ordersRepository.find();

        const listproductsUser = await listproducts.execute({ user_id });

        const products = listproductsUser?.product;

        const productsIds = products?.map(product => product.id);

    //     if (productsIds) {
    //         const teste2 = productsIds[0];
    //         console.log(teste2);
    //    }
           

        const teste: any[] = [];


        const ordersIds = orders.map(order => order.id)

        for (let i = 0; i < orders.length; i++){

            const order = await ordersRepository.findById(ordersIds[i]);
            const order2 = order?.order_products;

            if (order2 && productsIds) {
                for (let y = 0; y < order2?.length; y++) {
                    for (let z = 0; z < productsIds.length; z++) {
                        if (order2[y].product_id === productsIds[z]) {
                            teste.push({
                                producteste: order2[y].product_id,
                                quanti: order2[y].quantidade
                            });
                        }
                    }         
                }
            }
        }
        const productsRepository = getCustomRepository(ProductsRepository);

        const t = teste.map(teste => teste.producteste)

        const p: any[] = [];

        for (let k = 0; k < teste.length; k++) {
            p.push(await productsRepository.findById(t[k]));
        }

  
        const resul = teste.map(product => ({
            id: product.producteste,
            nome: p.filter(p => p.id === product.producteste )[0].nome,
            quantidade: product.quanti,
            }));
    

        // teste[0].producteste

     

        // const product = await productsRepository.findById();




        // for (let i = 0; i < orders.length; i++) {
            
        //     teste.push(await ordersRepository.findById(ordersIds[i]));
           
        // }



        // const orders2 = await ordersRepository.findById(ordersIds[0])

        // const orders3 = orders2?.order_products;

        

        

      
      
        // // teste3?.push(teste)

        // // const teste2 = teste?.map(product => product.quantidade * product.preco)
        // if(orders3)
        console.log(resul);

    }

}