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

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{

        const listorders = new ListOrderService();

        const orders = await listorders.execute();


        // const showOrders = new ShowOrderService();

 


        // const order = await showOrders.execute({ id });

     

        
        console.log(orders[0]);
    

    }

}