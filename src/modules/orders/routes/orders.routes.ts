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

ordersRouter.get(
    '/status/:status',
    celebrate({
        [Segments.PARAMS]: {
            status: Joi.string().required(),
        },
    }),
    ordersController.ordersstatus,
);

ordersRouter.get(
    '/user/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    ordersController.orderuser,
);

ordersRouter.get(
    '/user/:user_id/:ordermes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    ordersController.orderuserdata,
);

ordersRouter.get(
    '/:mes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            mes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    ordersController.ordersdata,
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