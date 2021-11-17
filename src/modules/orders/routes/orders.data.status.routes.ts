import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const ordersDataStatusRouter = Router();
const ordersController = new OrdersController();

ordersDataStatusRouter.use(isAuthenticated);


ordersDataStatusRouter.get(
    '/:ordermes/:ano/:status',
    celebrate({
        [Segments.PARAMS]: {
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
            status: Joi.string().required(),
        },
    }),
    ordersController.ordersdatastatus,
);

export default ordersDataStatusRouter;


