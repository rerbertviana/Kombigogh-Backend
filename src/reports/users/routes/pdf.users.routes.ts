import { Router } from 'express';
import ListUsersPDFService from '../services/ListUsersPDFService';

const pdfUserRouter = Router();
const listUsersPDF = new ListUsersPDFService();

pdfUserRouter.get('/', listUsersPDF.pdf);

export default pdfUserRouter;



