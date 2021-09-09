import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ListUsersPDFService from '../services/ListUsersPDFService';

const pdfUserRouter = Router();
const listUsersPDF = new ListUsersPDFService();




pdfUserRouter.get('/', listUsersPDF.pdf);



export default pdfUserRouter;



