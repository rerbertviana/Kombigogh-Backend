import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListOrdersproductsDataService from "../services/ListOrdersproductsDataService";
import ListOrdersproductsService from "../services/ListOrdersproductsService";
import ListOrderUserService from "../services/ListOrderUserService";
import ListProductUserService from "../services/ListProductUserService";
import ListUserService from "../services/ListUserService";
import { classToClass } from 'class-transformer';
import UpdateUserService from "../services/UpdateUserService";



export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        
        const listusers = new ListUserService();

        const users = await listusers.execute();

        return response.json(classToClass(users));
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

        return response.json(classToClass(user));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { nome, email, senha, telefone, user_id } = request.body;

        const updateUsers = new UpdateUserService();

        const user = await updateUsers.execute({
            user_id,
            nome,
            email,
            senha,
            telefone,
        });

        return response.json(classToClass(user));
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

        return response.json(classToClass(users));
    }


    public async orders(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;

        const listorders = new ListOrderUserService();

        const users = await listorders.execute({ user_id });

        return response.json(classToClass(users));
    }


    public async ordersproducts(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;

        const listordersproducts = new ListOrdersproductsService();

        const ordersproducts = await listordersproducts.execute({ user_id });

        return response.json(ordersproducts);
    }

    public async ordersproductsdata(request: Request, response: Response): Promise<Response> {

        const { mes, ano } = request.params;

        const user_id = request.user.id;

        const listordersproductsdata = new ListOrdersproductsDataService();

        const ordersproducts = await listordersproductsdata.execute({ user_id, mes, ano });

        return response.json(ordersproducts);
    }


}