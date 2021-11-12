import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersStatusPDFService from '../services/ListOrdersStatusPDFService';
import ListOrdersUserDataStatusPDFService from '../services/ListOrdersUserDataStatusPDFService';

const pdfOrderStatusRouter = Router();
const listOrdersStatusPDF = new ListOrdersStatusPDFService();
const listOrdersUserDataStatusPDF = new ListOrdersUserDataStatusPDFService();


pdfOrderStatusRouter.get(
    '/:status',
    celebrate({
        [Segments.PARAMS]: {
            status: Joi.string().required(),
        },
    }),
    listOrdersStatusPDF.pdf
);

pdfOrderStatusRouter.get(
    '/:status/:user_id/:ordermes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            status: Joi.string().required(),
            user_id: Joi.string().uuid().required(),
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    listOrdersUserDataStatusPDF.pdf
);

export default pdfOrderStatusRouter;



