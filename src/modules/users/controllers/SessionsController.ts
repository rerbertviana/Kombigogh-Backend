import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";



export default class SessionsController {


    public async create(request: Request, response: Response): Promise<Response> {

        const { email, senha } = request.body;

        const createSessions = new CreateSessionsService();

        const user = await createSessions.execute({
            email,
            senha,
        });

        return response.json(user);
    }
}