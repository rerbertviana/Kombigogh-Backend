import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';
import { celebrate, Joi, Segments } from 'celebrate';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
        },
    }),
    categoriesController.create
);

categoriesRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            nome: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    categoriesController.update
);

categoriesRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    categoriesController.show
);

categoriesRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    categoriesController.delete
);


export default categoriesRouter;