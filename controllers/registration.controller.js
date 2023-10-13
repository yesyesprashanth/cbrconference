import * as registrationModel from '../models/userregistration.model.js'

export const userRegistration = (req,res) =>{
    const {emailid, name, role, organisation} = req.body;
    registrationModel.saveUser(req.body, (result)=>{       
        if(result==1)      
            res.json("User registered successfully");
        else if(data==2)
            res.json("user already registered");
    })    
}

export const checkUserExist = (req, res) =>{
    const emailid = req.body.emailid;
    registrationModel.checkUserExist(emailid, (result)=>{
        if(result==0)
            res.json("User does not Exist");
        else 
            res.json("User Exists");
    })    
}