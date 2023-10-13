import express from 'express';
const route = express.Router();
import { saveFeedback, getFeedbackList } from '../controllers/feedback.controller.js';

route.post('/postfeedback', saveFeedback);
route.get('/getfeedback', getFeedbackList);                      


export default route;