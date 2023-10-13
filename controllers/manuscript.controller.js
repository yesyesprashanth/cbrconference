import formidable from 'formidable';
import * as manuscriptModel from '../models/manuscript.model.js'

export const saveAbstract = (req,res) =>{
    const form = formidable({multiples:true});
    form.parse(req, (err, fields, files)=>{
        if(err) throw err;

        const data = {
            emailid: fields.emailid, 
            abFile: files.abFile[0].filepath
        }

        console.log(data);
        // res.json("Abstract");

        manuscriptModel.saveAbstract(data, (result)=>{
            if(result==1)
                res.json("File saved successfully");
            else if(result==2)
                res.json("Please register and then try to upload the file")
            else 
                res.json("Abstract file already exist");
        })
    })
}

export const saveFullpaper = (req,res) =>{
    
    const form = formidable({multiples:true});
    form.parse(req, (err, fields, files)=>{       
        const data = {
            emailid:fields.emailid,
            pgFile: files.pgFile[0].filepath,
            fpFile: files.fpFile[0].filepath
        }
        manuscriptModel.saveFullpaper(data, (result)=>{
           if(result==1)
            res.json("Files uploaded successfully");
           else if(result==2)
            res.json("Please register and then try to upload the file");
           else if(result==3)
            res.json("Please upload abstract and upload the fullpaper");
        })         
    })    
}

export const getAbstract = (req,res) =>{
    const emailid = req.body.emailid;

    manuscriptModel.checkAbstract(emailid, result=>{
        if(result==0)
            res.json("Abstract does not exist");
        else 
            res.json("Abstract already exist");
    })    
}