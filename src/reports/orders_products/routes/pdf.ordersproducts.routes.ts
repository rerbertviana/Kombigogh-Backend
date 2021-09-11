import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersproductsUserPDFService from '../services/ListOrdersproductsUserPDFService';
import TestService from 'src/reports/products/services/TestService';
import ListOrdersproductsUserDatePDFService from '../services/ListOrdersproductsUserDatePDFService';
import ListOrdersproductsPDFService from '../services/ListOrdersproductsPDFService';

const pdfOrdersproductsRouter = Router();
const ListOrdersproductsUserPDF = new ListOrdersproductsUserPDFService();
const ListOrdersproductsUserDatePDF = new ListOrdersproductsUserDatePDFService();
const ListOrdersproductsPDF = new ListOrdersproductsPDFService();
const test = new TestService();

pdfOrdersproductsRouter.get('/', ListOrdersproductsPDF.pdf)

pdfOrdersproductsRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    ListOrdersproductsUserPDF.pdf
);

pdfOrdersproductsRouter.get(
    '/:user_id/:mes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            mes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    ListOrdersproductsUserDatePDF.pdf
);



export default pdfOrdersproductsRouter;