import { json, query } from 'express';
import * as manuscriptModel from '../models/manuscript.model.js'

export const saveAbstract = (req,res) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        const data = {
            emailid: req.body.emailid,
            abFile: req.file.path,
            filename: req.file.originalname
        }
       
        if(data.emailid!="" && data.abFile!="" && data.filename!="")
        {
            manuscriptModel.saveAbstract(data, (result)=>{                
                if(result==0)
                    res.json("Please register and then try to upload the file")
                else if(result==1)
                    res.status(201).json("File uploaded successfully");                
                else if(result==2)
                    res.json("Abstract file already exist");
                else
                    res.json(result); //Error
            });
        }else
            res.json("Please fill all the details");
}

export const saveFullpaper = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
        const data = {
            emailid:req.body.emailid,
            pgFile: req.files.plagiarismReport[0].path,
            file1: req.files.plagiarismReport[0].originalname,
            fpFile: req.files.fullPaper[0].path,
            file2: req.files.fullPaper[0].originalname,
        }
           
        if(data.emailid!="" && data.pgFile!="" && data.fpFile!="")
        {
            manuscriptModel.saveFullpaper(data, (result)=>{               
                if(result==0)
                    res.json("Please register and then try to upload the file");
                if(result==1)
                    res.json("Files uploaded successfully");            
                else if(result==2)
                    res.json("Please upload abstract and upload the fullpaper");                
                else 
                    res.status(404).json(result);
            })         
        }

}

export const getAbstract = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const emailid = req.body.emailid;

    manuscriptModel.checkAbstract(emailid, result=>{
        if(result==0)
            res.json("Abstract does not exist");
        else 
            res.json("Abstract already exist");
    })    
}

export const getManuscriptList =(req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
    manuscriptModel.getMaunscriptList((manuscriptList)=>{
         res.json(manuscriptList);
    })
    } catch (error) {        
        console.error('Error fetching manuscriptlist list:', error);
        res.status(500).json({ error: 'An error occurred while fetching payment data.' });
  }
}

export const downloadManuscript = (req,res) =>{   
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { emailid, fieldname } = req.query;
   
    try {
        manuscriptModel.getManuscriptBlob(emailid, fieldname, (manuscript)=>{           
            res.send(manuscript);
        });
      } catch (error) {
        console.error('Error downloading manuscript:', error);
        res.status(500).json({ error: 'An error occurred while downloading the manuscript' });
    }
}