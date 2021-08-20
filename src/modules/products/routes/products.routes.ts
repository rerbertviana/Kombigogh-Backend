import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '../controllers/ProductsController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductAvatarController from '../controllers/ProductAvatarController';

const productsRouter = Router();
const productsController = new ProductsController();
const productAvatarController = new ProductAvatarController();

const upload = multer(uploadConfig);

productsRouter.use(isAuthenticated);

productsRouter.get('/', productsController.index);

productsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            preco: Joi.number().required(),
            quantidade: Joi.number().required(),
        },
    }),
    productsController.create
);

productsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.delete
);

productsRouter.patch(
    '/avatar/:product_id',
    celebrate({
        [Segments.PARAMS]: {
            product_id: Joi.string().uuid().required(),
        },
    }),
    upload.single('imagem'),
    productAvatarController.update,
);



export default productsRouter;