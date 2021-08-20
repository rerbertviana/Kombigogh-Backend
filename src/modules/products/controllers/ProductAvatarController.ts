import { Request, Response } from "express";
import ShowProductService from "../services/ShowProductService";
import UpdateProductAvatarService from "../services/UpdateProductAvatarService";


export default class ProductAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {
        
        const { product_id } = request.params;

        const updateAvatar = new UpdateProductAvatarService();

        const product = await updateAvatar.execute({
            product_id,
            avatarFilename: request.file.filename,
        });

        return response.json(product);
    }
}