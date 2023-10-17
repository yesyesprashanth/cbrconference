import * as manuscriptModel from '../models/manuscript.model.js'

export const saveAbstract = (req,res) =>{

        const data = {
            emailid: req.body.emailid,
            abFile: req.file.path
        }

        console.log(data);

        manuscriptModel.saveAbstract(data, (result)=>{
            if(result==1)
                res.json("File saved successfully");
            else if(result==2)
                res.json("Please register and then try to upload the file")
            else 
                res.json("Abstract file already exist");
        })
}

export const saveFullpaper = (req,res) =>{
            
        const data = {
            emailid:req.body.emailid,
            pgFile: req.files.plagiarismReport[0].path,
            fpFile: req.files.fullPaper[0].path
        }
    
        manuscriptModel.saveFullpaper(data, (result)=>{
           if(result==1)
            res.json("Files uploaded successfully");
           else if(result==2)
            res.json("Please register and then try to upload the file");
           else if(result==3)
            res.json("Please upload abstract and upload the fullpaper");
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