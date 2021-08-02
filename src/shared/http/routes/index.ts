import { Router } from 'express';
import categoriesRouter from '@modules/categories/routes/categories.routes';
import usersRouter from '@modules/users/routes/users.routes';



const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.get('/', (request, response) => {
    return response.json({ message: 'Testando!' });
})

export default routes;
