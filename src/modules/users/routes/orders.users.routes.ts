import { Router } from 'express';
import UsersController from '../controllers/UsersConstroller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const ordersUsersRouter = Router();
const usersController = new UsersController();


ordersUsersRouter.get('/', isAuthenticated, usersController.orders);

export default ordersUsersRouter;