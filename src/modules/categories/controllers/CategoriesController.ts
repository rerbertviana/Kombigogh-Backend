import { Request, Response } from "express";
import CreateCategoryService from "../services/CreateCategoryService";
import ListCategoryService from "../services/ListCategoryService";
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
    
    
}