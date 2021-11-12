import { Request, Response } from "express";
import CreateCategoryService from "../services/CreateCategoryService";
import DeleteCategoryService from "../services/DeleteCategoryService";
import ListCategoryService from "../services/ListCategoryService";
import ListProductCategoryService from "../services/ListProductCategoryService";
import ShowCategoryService from "../services/ShowCategoryService";
import UpdateCategoryService from "../services/UpdateCategoryService";

export default class CategoriesController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listCategories = new ListCategoryService();

        const categories = await listCategories.execute();

        return response.json(categories);
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { nome } = request.body;

        const createCategories = new CreateCategoryService();

        const categories = await createCategories.execute({
            nome
         });

        return response.json(categories);
    }


    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCategories = new ShowCategoryService;

        const categories = await showCategories.execute({ id });

        return response.json(categories);
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { nome } = request.body;
        const { id } = request.params;

        const updateCategories = new UpdateCategoryService();

        const categories = await updateCategories.execute({
            id,
            nome,
        });

        return response.json(categories);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCategories = new DeleteCategoryService();

        await deleteCategories.execute({ id });

        return response.json([]);
    }

    public async products(request: Request, response: Response): Promise<Response> {

        const { category_id } = request.params;

        const listProducts = new ListProductCategoryService();

        const products = await listProducts.execute({ category_id });

        return response.json(products);
    }
    
    
}