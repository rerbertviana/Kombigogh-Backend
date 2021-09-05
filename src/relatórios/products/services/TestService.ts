import { Request, Response, Router } from 'express';
import ListProductsPDFService from './ListProductsPDFService';
import ShowProductsPDFService from './ListProductsUserPDFService';
import ProfileProductsController from '@modules/products/controllers/ProfileProductsController';
import ListProductCategoryService from '@modules/categories/services/ListProductCategoryService';
import ListProductUserService from '@modules/users/services/ListProductUserService';

const pdfRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const showProductsPDF = new ShowProductsPDFService();
const profileProductsController = new ProfileProductsController();

export default class TestService{

    public async pdf(request: Request, response: Response): Promise<void>{


        const { user_id, category_id } = request.params;

        const listproducts = new ListProductUserService();
        const listCategory = new ListProductCategoryService();

        const listproductsCategory = await listCategory.execute({ category_id });
        const listproductsUser = await listproducts.execute({ user_id });


        const nomeartista = listproductsUser?.nome;
        const nomeCategory = listproductsCategory?.nome;

        

        const teste = listproductsUser?.product;


        const teste2 = teste?.map(product => product.category_id === category_id);

        const teste3: any[] = [];

        if (teste2 && teste) {
            for (let i = 0; i < teste2.length; i++) {
                if (teste2[i] == true) {
                    teste3.push(teste[i]);
                }
            }       
        }



      
        // teste3?.push(teste)

        // const teste2 = teste?.map(product => product.quantidade * product.preco)

        console.log(nomeCategory);

    }

}