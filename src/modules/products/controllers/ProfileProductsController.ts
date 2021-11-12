import { Request, Response } from "express";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";




export default class ProfileProductsController {

  public async show(request: Request, response: Response): Promise<Response> {

    const { product_id } = request.params;
    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ product_id})

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { product_id, category_id } = request.params;
    const { nome, descricao, preco, quantidade } = request.body;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      product_id,
      nome,
      descricao,
      preco,
      quantidade,
      category_id
    });

    return response.json(product);
  }


}



  
  
  
  
 