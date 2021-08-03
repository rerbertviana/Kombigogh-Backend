import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        
        const listUsers = new ListUserService();

        const users = await listUsers.execute();

        return response.json(users);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const showUsers = new ShowUserService();

        const users = await showUsers.execute({ id });

        return response.json(users);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { nome, email, senha,  telefone} = request.body;

        const createUsers = new CreateUserService();

        const users = await createUsers.execute({
            nome,
            email,
            senha,
            telefone,
         });

        return response.json(users);
    }
    public async update(request: Request, response: Response): Promise<Response> {
        const { nome, email, senha, telefone } = request.body;
        const { id } = request.params;

        const updateUsers = new UpdateUserService();

        const users = await updateUsers.execute({
            id,
            nome,
            email,
            senha,
            telefone,
        });

        return response.json(users);
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUsers = new DeleteUserService();

        await deleteUsers.execute({ id });

        return response.json([]);
    }
}