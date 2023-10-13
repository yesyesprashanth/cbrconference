import express from 'express';
const route = express.Router();
import {userRegistration, checkUserExist} from '../controllers/registration.controller.js';

route.post('/userregistration',  userRegistration);
route.post('/checkuserexist', checkUserExist);

export default route;