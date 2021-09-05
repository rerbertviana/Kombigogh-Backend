import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListOrdersPDFService from '../services/ListOrdersPDFService';

const pdfOrderRouter = Router();
const listOrdersPDF = new ListOrdersPDFService();




pdfOrderRouter.get('/', listOrdersPDF.pdf);



export default pdfOrderRouter;



