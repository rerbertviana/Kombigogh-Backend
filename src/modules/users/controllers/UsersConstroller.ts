import ShowCategoryService from "@modules/categories/services/ShowCategoryService";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";



export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        
        const listusers = new ListUserService();

        const users = await listusers.execute();

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        
        const { nome, email, senha, telefone } = request.body;
        
        const createUsers = new CreateUserService();

        const user = await createUsers.execute({
            nome,
            email,
            senha,
            telefone
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUsers = new DeleteUserService();

        await deleteUsers.execute({ id });

        return response.json([]);
    }
 
}