import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CategoriesController from '../controllers/CategoriesController';


const productsCategoriesRouter = Router();
const categoriesController = new CategoriesController();


productsCategoriesRouter.get(
    '/:category_id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            category_id: Joi.string().uuid().required(),
        },
    }),
    categoriesController.products);

export default productsCategoriesRouter;