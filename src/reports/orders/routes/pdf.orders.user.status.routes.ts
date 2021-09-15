import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersUserStatusPDFService from '../services/ListOrdersUserStatusPDFService';

const pdfOrderStatusUserRouter = Router();
const listOrdersUserStatusPDF = new ListOrdersUserStatusPDFService();


pdfOrderStatusUserRouter.get(
    '/:status/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            status: Joi.string().required(),
            user_id: Joi.string().uuid().required(),
        },
    }),
    listOrdersUserStatusPDF.pdf
);

export default pdfOrderStatusUserRouter;



