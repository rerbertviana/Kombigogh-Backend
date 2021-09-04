import { Router } from 'express';
import PdfsController from '../controllers/PdfsController';
import ProductPDFService from '../services/ProductPDFService';

const pdfRouter = Router();
const productPDF = new ProductPDFService();


pdfRouter.get('/', productPDF.pdf);


export default pdfRouter;



