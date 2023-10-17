import express from 'express';
import multer from 'multer';
import { getAbstract, saveAbstract, saveFullpaper } from '../controllers/manuscript.controller.js';
const route = express.Router();

const upload = multer({dest:'uploads/'});

route.post('/postabstract', upload.single('file'), saveAbstract);
route.post('/postfullpaper', upload.fields([{name:'plagiarismReport'}, {name:'fullPaper'}]),  saveFullpaper);

route.post('/checkabstract', getAbstract);

export default route;