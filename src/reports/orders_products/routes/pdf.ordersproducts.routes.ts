import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersproductsUserPDFService from '../services/ListOrdersproductsUserPDFService';
import ListOrdersproductsUserDatePDFService from '../services/ListOrdersproductsUserDatePDFService';


const pdfOrdersproductsRouter = Router();
const ListOrdersproductsUserPDF = new ListOrdersproductsUserPDFService();
const ListOrdersproductsUserDatePDF = new ListOrdersproductsUserDatePDFService();


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