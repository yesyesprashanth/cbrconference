import express from 'express';
import { getAbstract, saveAbstract, saveFullpaper } from '../controllers/manuscript.controller.js';
const route = express.Router();

route.post('/postabstract', saveAbstract);
route.post('/postfullpaper', saveFullpaper);

route.post('/checkabstract', getAbstract);

export default route;