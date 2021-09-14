import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TestService from 'src/reports/products/services/TestService';
import ListOrdersproductsOrderPDFService from '../services/ListOrdersproductsOrderPDFService';

const pdfOrdersproductsOrderRouter = Router();
const listOrdersproductsOrderPDF = new ListOrdersproductsOrderPDFService();


pdfOrdersproductsOrderRouter.get(
    '/:order_id',
    celebrate({
        [Segments.PARAMS]: {
            order_id: Joi.string().uuid().required(),
        },
    }),
    listOrdersproductsOrderPDF.pdf
);



export default pdfOrdersproductsOrderRouter;