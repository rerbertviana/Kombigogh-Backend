import { Router } from 'express';
import UsersController from '../controllers/UsersConstroller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';



const ordersproductsUsersRouter = Router();
const usersController = new UsersController();

ordersproductsUsersRouter.use(isAuthenticated);



ordersproductsUsersRouter.get('/', usersController.ordersproducts);

ordersproductsUsersRouter.get(
    '/:mes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            mes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    usersController.ordersproductsdata
);


export default ordersproductsUsersRouter;