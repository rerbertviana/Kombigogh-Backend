import { Request, Response, Router } from 'express';
import ListProductsPDFService from './ListProductsPDFService';
import ShowProductsPDFService from './ListProductsUserPDFService';
import ProfileProductsController from '@modules/products/controllers/ProfileProductsController';
import ListProductUserService from '@modules/users/services/ListProductUserService';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import ListOrderService from '@modules/orders/services/ListOrderService';
import ShowOrderService from '../../../modules/orders/services/ShowOrderService'
import ListProductService from '@modules/products/services/ListProductService';

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{

        const listorders = new ListOrderService();

        const orders = await listorders.execute();

        const ordersLength = orders.length;

        const totalOrders = orders.map(order => order.total);

        let total = 0;

        for (let i = 0; i < totalOrders.length; i++) {
            total = total + totalOrders[i];
        }

        const showOrders = new ShowOrderService();

        const ordersproducts: any[] = [];

        const ordersids = orders.map(order => order.id)


        for (let i = 0; i < ordersids.length; i++) {

            let id = ordersids[i];
            let teste = await showOrders.execute({ id });
            ordersproducts.push(teste.order_products);
        }

        
        const listproducts = new ListProductService();

        const products = await listproducts.execute();


        const resul: any[] = [];

        // test.push(ordersproducts.map(order => order[0].order_id));


        const totalvendas: any[] = [];

        for (let i = 0; i < ordersproducts.length; i++) {
            resul.push(
                ordersproducts.map(order => ({
                    order_id: order[i].order_id,
                    produto: order[i].product_id,
                    nome: products.filter(p=> p.id === order[i].product_id)[0].nome,
                    preco: order[i].preco,
                    quantidade: order[i].quantidade
                }))
            )
        }

        const body: any[] = [];

        for (let i = 0; i < resul.length; i++) {
            
            for await (let product of resul[i]) {
                const rows = new Array();
                rows.push(product.order_id);
                rows.push(product.produto);
                rows.push(product.nome);
                rows.push(product.preco);

                body.push(rows);
            }    
        }

        
        
        
        console.log(ordersproducts);
        console.log(resul[0]);
        console.log(total);
        console.log(body);

    }

}