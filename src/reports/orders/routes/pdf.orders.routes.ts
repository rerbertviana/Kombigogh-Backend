import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersPDFService from '../services/ListOrdersPDFService';
import ListOrdersUserPDFService from '../services/ListOrdersUserPDFService';
import ListOrdersDataPDFService from '../services/ListOrdersDataPDFService';
import ListOdersUserDataPDFService from '../services/ListOdersUserDataPDFService';

const pdfOrderRouter = Router();
const listOrdersPDF = new ListOrdersPDFService();
const listOrdersUserPDF = new ListOrdersUserPDFService();
const listOrdersDataPDF = new ListOrdersDataPDFService();
const listOdersUserDataPDF = new ListOdersUserDataPDFService();


pdfOrderRouter.get('/', listOrdersPDF.pdf);

pdfOrderRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    listOrdersUserPDF.pdf
);


pdfOrderRouter.get(
    '/:user_id/:ordermes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    listOdersUserDataPDF.pdf
);

pdfOrderRouter.get(
    '/:ordermes/:ano',
    celebrate({
        [Segments.PARAMS]: {
            ordermes: Joi.number().required(),
            ano: Joi.number().required(),
        },
    }),
    listOrdersDataPDF.pdf
);


export default pdfOrderRouter;



