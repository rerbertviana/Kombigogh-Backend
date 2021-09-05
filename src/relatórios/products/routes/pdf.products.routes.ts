import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListProductsPDFService from '../services/ListProductsPDFService';
import TestService from '../services/TestService';
import ListProductsCategoryPDFService from '../services/ListProductsCategoryPDFService';
import ListProductsUserPDFService from '../services/ListProductsUserPDFService';
import ListProductsUserCategoryPDFService from '../services/ListProductsUserCategoryPDFService';

const pdfProductRouter = Router();
const listProductsPDF = new ListProductsPDFService();
const listProductsUserPDF = new ListProductsUserPDFService();
const listProductsCategoryPDF = new ListProductsCategoryPDFService();
const listProductsUserCategoryPDF = new ListProductsUserCategoryPDFService();
const test = new TestService();



pdfProductRouter.get('/', listProductsPDF.pdf);

pdfProductRouter.get(
    '/user/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    test.pdf
);

pdfProductRouter.get(
    '/category/:category_id',
    celebrate({
        [Segments.PARAMS]: {
            category_id: Joi.string().uuid().required(),
        },
    }),
    listProductsCategoryPDF.pdf
);

pdfProductRouter.get(
    '/:user_id/:category_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
            category_id: Joi.string().uuid().required(),
        },
    }),
    listProductsUserCategoryPDF.pdf
);



export default pdfProductRouter;



