import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersPDFService from '../services/ListOrdersPDFService';
import ListOrdersUserPDFService from '../services/ListOrdersUserPDFService';

const pdfOrderRouter = Router();
const listOrdersPDF = new ListOrdersPDFService();
const listOrdersUserPDF = new ListOrdersUserPDFService();




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


export default pdfOrderRouter;



