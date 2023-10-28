import express from 'express';
const route = express.Router();
import {userRegistration, checkUserExist, getUserList} from '../controllers/registration.controller.js';

route.post('/userregistration',  userRegistration);
route.post('/checkuserexist', checkUserExist);

route.get('/getuserlist', getUserList);

export default route;