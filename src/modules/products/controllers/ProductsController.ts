import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";



export default class ProductsController {


    public async create(request: Request, response: Response): Promise<Response> {

        const { nome, descricao, preco, quantidade } = request.body;

        const createProducts = new CreateProductService();
        const user_id = request.user.id;

        const user = await createProducts.execute({
            user_id,
            nome,
            descricao,
            preco,
            quantidade,
        });

        return response.json(user);
    }

    public async index(request: Request, response: Response): Promise<Response> {

        const listproducts = new ListProductService();

        const products = await listproducts.execute();

        return response.json(products);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteProducts = new DeleteProductService();

        await deleteProducts.execute({ id });

        return response.json([]);
    }

}