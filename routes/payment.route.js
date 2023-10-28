import express from 'express';
import multer from 'multer'; // For handling file uploads

const upload = multer({dest:'uploads/'})

import { checkPayment, savePayment, readReceipt, getPaymentList, downloadReceipt } from '../controllers/payment.controller.js';
const route = express.Router();

route.post('/postpayment', upload.single('file'), savePayment);

route.post('/checkpayment', checkPayment);


route.get('/readreceipt', readReceipt);

route.get('/downloadreceipt', downloadReceipt);

route.get('/getpaymentlist', getPaymentList)

export default route;