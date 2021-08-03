import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { email, senha } = request.body;

        const createSession = new CreateSessionService();

        const users = await createSession.execute({
            email,
            senha,
        });

        return response.json(users);
    }

}
