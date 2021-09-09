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
import ordersRouter from '@modules/orders/routes/orders.routes';
import ordersUsersRouter from '@modules/users/routes/orders.users.routes';
import pdfProductRouter from 'src/reports/products/routes/pdf.products.routes';
import pdfUserRouter from 'src/reports/users/routes/pdf.users.routes';
import pdfOrderRouter from 'src/reports/orders/routes/pdf.orders.routes';
import pdfOrdersproductsRouter from 'src/reports/orders_products/routes/pdf.ordersproducts.routes';




const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/productsprofile', productsProfileRouter);
routes.use('/usersproducts', productsUsersRouter);
routes.use('/usersorders', ordersUsersRouter);
routes.use('/categoriesproducts', productsCategoriesRouter);
routes.use('/orders', ordersRouter);
routes.use('/pdfproducts', pdfProductRouter);
routes.use('/pdfusers', pdfUserRouter);
routes.use('/pdforders', pdfOrderRouter);
routes.use('/pdfordersproducts', pdfOrdersproductsRouter);



routes.get('/', (request, response) => {
    return response.json({ message: 'Testando!' });
})

export default routes;
