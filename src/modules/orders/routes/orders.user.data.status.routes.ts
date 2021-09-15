import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersUserDataStatusRouter = Router();
const ordersController = new OrdersController();

ordersUserDataStatusRouter.use(isAuthenticated);


ordersUserDataStatusRouter.get(
    '/:user_id/:ordermes/:ano/:status',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
            status: Joi.string().required(),
        },
    }),
    ordersController.orderuserdatastatus,
);
ordersUserDataStatusRouter.get(
    '/:user_id/:status',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            status: Joi.string().required(),
        },
    }),
    ordersController.orderuserstatus,
);

export default ordersUserDataStatusRouter;


