import { Router } from 'express';
import categoriesRouter from '@modules/categories/routes/categories.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import productsRouter from '@modules/products/routes/products.routes';
import productsProfileRouter from '@modules/products/routes/products.profile.routes';
import productsUsersRouter from '@modules/users/routes/products.users.routes';
import productsCategoriesRouter from '@modules/categories/routes/products.categories.routes';




const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/productsprofile', productsProfileRouter);
routes.use('/usersproducts', productsUsersRouter);
routes.use('/categoriesproducts', productsCategoriesRouter);




routes.get('/', (request, response) => {
    return response.json({ message: 'Testando!' });
})

export default routes;
