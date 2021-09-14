import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersproductsUserPDFService from '../services/ListOrdersproductsUserPDFService';
import ListOrdersproductsUserDatePDFService from '../services/ListOrdersproductsUserDatePDFService';
import ListOrdersproductsPDFService from '../services/ListOrdersproductsPDFService';
import ListOrdersproductsDatePDFService from '../services/ListOrdersproductsDatePDFService';


const pdfOrdersproductsRouter = Router();
const ListOrdersproductsUserPDF = new ListOrdersproductsUserPDFService();
const ListOrdersproductsUserDatePDF = new ListOrdersproductsUserDatePDFService();
const ListOrdersproductsPDF = new ListOrdersproductsPDFService();
const ListOrdersproductsDatePDF = new ListOrdersproductsDatePDFService();

pdfOrdersproductsRouter.get('/', ListOrdersproductsPDF.pdf);



pdfOrdersproductsRouter.get(
    '/:mes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            mes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    ListOrdersproductsDatePDF.pdf
);

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