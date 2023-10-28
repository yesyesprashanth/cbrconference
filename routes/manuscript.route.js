import express from 'express';
import multer from 'multer';
import { getAbstract, saveAbstract, saveFullpaper, getManuscriptList, downloadManuscript } from '../controllers/manuscript.controller.js';
const route = express.Router();

const upload = multer({dest:'uploads/'});

route.post('/postabstract', upload.single('file'), saveAbstract);
route.post('/postfullpaper', upload.fields([{name:'plagiarismReport'}, {name:'fullPaper'}]),  saveFullpaper);
route.post('/checkabstract', getAbstract);

route.get('/getmanuscriptlist', getManuscriptList);
route.get('/downloadmanuscript', downloadManuscript)

export default route;