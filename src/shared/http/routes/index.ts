import { Router } from 'express';
import usersRouter from '@modules/usuarios/routes/users.routes';
import categoriesRouter from '@modules/categorias/routes/categories.routes'

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.get('/', (request, response) => {
    return response.json({ message: 'Testando!' });
})

export default routes;
