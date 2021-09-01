import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/', isAuthenticated, ordersController.index);

ordersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

ordersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            products: Joi.required(),
            cliente: Joi.string().required(),
        },
    }),
    ordersController.create,
);

ordersRouter.post(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.reverse
);

export default ordersRouter;