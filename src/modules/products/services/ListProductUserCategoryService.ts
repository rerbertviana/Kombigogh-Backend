import ListProductCategoryService from "@modules/categories/services/ListProductCategoryService";
import ListProductUserService from "@modules/users/services/ListProductUserService";
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    
    user_id: string;
    category_id: string;

}


class ListProductUserCategoryService {

    public async execute({ user_id, category_id }: IRequest): Promise< Object | undefined> {
        
        // chamar os serviços de listagem por usuario e categoria
        const listProducts = new ListProductUserService();
        const listCategory = new ListProductCategoryService();
        const listproductsCategory = await listCategory.execute({ category_id });
        const listProductsUser = await listProducts.execute({ user_id });

        // pegar os nomes e a categoria
        const nomeUser = listProductsUser?.nome;
        const nomeCategory = listproductsCategory?.nome;

        // setar somente os produtos 
        const allProductsUser = listProductsUser?.product;

        // verificar se existe produto de acordo com a categoria
        const ExistCategoryProduct = allProductsUser?.map(product => product.category_id === category_id);


        const redisCache = new RedisCache();

        let productscache = await redisCache.recover<any[]>('api-kombigogh-PRODUCT_LIST_USER_CATEGORY',);

        const products: any[] = [];


        if (!productscache) {
           
            //setar em products os produtos que tem a categoria de acordo com a entrada
            if (ExistCategoryProduct && allProductsUser) {
                for (let i = 0; i < ExistCategoryProduct.length; i++) {
                    if (ExistCategoryProduct[i] == true) {
                        products.push(allProductsUser[i]);
                    }
                }
            }
            productscache = products;
            await redisCache.save('api-kombigogh-PRODUCT_LIST_USER_CATEGORY', productscache);
        }
        
      

        return products;
    }
}

export default ListProductUserCategoryService;