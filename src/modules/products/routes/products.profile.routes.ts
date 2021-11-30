import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileProductsController from '../controllers/ProfileProductsController';

const productsProfileRouter = Router();
const profileProductsController = new ProfileProductsController();

productsProfileRouter.use(isAuthenticated);

productsProfileRouter.get(
    '/:product_id',
    celebrate({
        [Segments.PARAMS]: {
            product_id: Joi.string().uuid().required(),
        },
    }),
    profileProductsController.show
);

productsProfileRouter.put(
    '/:product_id/:category_id',
    celebrate({
        [Segments.PARAMS]: {
            product_id: Joi.string().uuid().required(),
            category_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            preco: Joi.number().required(),
            quantidade: Joi.number().required(),
        },
    }),
    profileProductsController.update,
);

productsProfileRouter.get('/active/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    profileProductsController.activeproductsuser
);

export default productsProfileRouter;