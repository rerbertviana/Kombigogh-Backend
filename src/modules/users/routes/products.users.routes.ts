import { Router } from 'express';
import UsersController from '../controllers/UsersConstroller';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';


const productsUsersRouter = Router();
const usersController = new UsersController();


productsUsersRouter.get('/', isAuthenticated, usersController.products);

export default productsUsersRouter;