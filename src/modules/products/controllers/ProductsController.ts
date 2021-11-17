import ListProductUserService from "@modules/users/services/ListProductUserService";
import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import { classToClass } from 'class-transformer';
import ListProductUserCategoryService from "../services/ListProductUserCategoryService";
import ListActiveProductService from "../services/ListActiveProductService";


export default class ProductsController {


    public async create(request: Request, response: Response): Promise<Response> {

        const { category_id } = request.params;
        const { nome, descricao, preco, quantidade } = request.body;

        const createProducts = new CreateProductService();
        const user_id = request.user.id;

        const user = await createProducts.execute({
            user_id,
            nome,
            descricao,
            preco,
            quantidade,
            category_id
        });

        return response.json(user);
    }

    public async index(request: Request, response: Response): Promise<Response> {

        const listproducts = new ListProductService();

        const products = await listproducts.execute();

        return response.json(products);
    }

    public async actives(request: Request, response: Response): Promise<Response> {

        const listproductsactives = new ListActiveProductService();

        const products = await listproductsactives.execute();

        return response.json(products);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteProducts = new DeleteProductService();

        await deleteProducts.execute({ id });

        return response.json([]);
    }

    public async productsuser(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.params;

        const listprodcuts = new ListProductUserService();

        const users = await listprodcuts.execute({ user_id });

        return response.json(classToClass(users));
    }

    public async productsusercategory(request: Request, response: Response): Promise<Response> {

        const { user_id, category_id } = request.params;

        const listprodcuts = new ListProductUserCategoryService();

        const users = await listprodcuts.execute({ user_id, category_id });

        return response.json(classToClass(users));
    }

}