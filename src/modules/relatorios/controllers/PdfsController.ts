import { Request, Response } from "express";
import ListProductPDFService from "../services/ListProductPdfService";




export default class PdfsController {


    public async pdf(request: Request, response: Response): Promise<Response> {
        
        const listProducts = new ListProductPDFService();

        const products = await listProducts.execute();

        console.log(products);

        return response.json(products);
    }


}