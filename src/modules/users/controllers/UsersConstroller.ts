import ShowCategoryService from "@modules/categories/services/ShowCategoryService";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";


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

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUsers = new ShowUserService();

        const user = await showUsers.execute({ id });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { nome, email, senha, telefone } = request.body;
        const { id } = request.params;

        const updateUsers = new UpdateUserService();

        const user = await updateUsers.execute({
            id,
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