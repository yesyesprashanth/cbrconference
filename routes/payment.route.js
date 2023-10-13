import express from 'express';
import { checkPayment, savePayment, readReceipt } from '../controllers/payment.controller.js';
const route = express.Router();

route.post('/postpayment', savePayment);

route.post('/checkpayment', checkPayment);

route.get('/readreceipt', readReceipt)

export default route;