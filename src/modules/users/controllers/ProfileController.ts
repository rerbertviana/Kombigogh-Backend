import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";




export default class SessionsController {

    public async show(request: Request, response: Response): Promise<Response> {
        
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;

        const user = await showProfile.execute({ user_id });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { nome, email, senha, senha_antiga, telefone } = request.body;
        const user_id = request.user.id;

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            user_id,
            nome,
            email,
            senha,
            senha_antiga,
            telefone,
        });

        return response.json(user);
    }




}


