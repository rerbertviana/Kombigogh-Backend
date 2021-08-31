import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListOrderUserService from "../services/ListOrderUserService";
import ListProductUserService from "../services/ListProductUserService";
import ListUserService from "../services/ListUserService";



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

    public async products(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;
        
        const listprodcuts = new ListProductUserService();

        const users = await listprodcuts.execute({ user_id });

        return response.json(users);
    }


    public async orders(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;

        const listorders = new ListOrderUserService();

        const users = await listorders.execute({ user_id });

        return response.json(users);
    }


}