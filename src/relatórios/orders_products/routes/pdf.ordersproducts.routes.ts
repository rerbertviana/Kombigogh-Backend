import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersproductsUserPDFService from '../services/ListOrdersproductsUserPDFService';


const pdfOrdersproductsRouter = Router();
const ListOrders_productsUser = new ListOrdersproductsUserPDFService();



pdfOrdersproductsRouter.get(
    '/user/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    ListOrders_productsUser.pdf
);

export default pdfOrdersproductsRouter;