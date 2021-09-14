import { Request, Response, Router } from 'express';
import ListProductsPDFService from './ListProductsPDFService';
import ShowProductsPDFService from './ListProductsUserPDFService';
import ProfileProductsController from '@modules/products/controllers/ProfileProductsController';
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '../../../modules/orders/services/ShowOrderService'
import ListProductService from '@modules/products/services/ListProductService';
import ListUserService from '@modules/users/services/ListUserService';

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{

        const { order_id } = request.params;

        const id = order_id;

        // listar o pedido especifico
        const showorder = new ShowOrderService();
        const order = await showorder.execute({ id });

        // setar apenas order_products do pedido
        const ordersproducts = order.order_products;

        //listar todos os produtos
        const listproducts = new ListProductService();
        const products = await listproducts.execute();

        //listar todos os usuarios
        const listusers = new ListUserService();
        const users = await listusers.execute();


        // const resul: any[] = [];

        // // setar array resul 

        // // for para varrer todos os ordersproducts dentro de ordersproducts


    
        // //  resul.push(
        // //         ordersproducts.map(order => ({
        // //             artista: users.filter(u => u.id === (products.filter(p => p.id === order.product_id)[0].user_id))[0].nome,
        // //             produto: products.filter(p => p.id === order.product_id)[0].nome,
        // //             preco: order.preco,
        // //             quantidade: order.quantidade
        // //         }))
        // // )
        
        const resul = ordersproducts.map(order => ({
            artista: users.filter(u => u.id === (products.filter(p => p.id === order.product_id)[0].user_id))[0].nome,
            produto: products.filter(p => p.id === order.product_id)[0].nome,
            preco: order.preco,
            quantidade: order.quantidade
        }));


        const body: any[] = [];

    
        for await (let product of resul) {
            const rows = new Array();

            rows.push(product.artista);
            rows.push(product.produto);
            rows.push(product.preco);
            rows.push(product.quantidade);

            body.push(rows);

            }    
        
        console.log(resul);
        console.log(body);
    

    }

}