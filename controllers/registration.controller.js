import * as registrationModel from '../models/userregistration.model.js'

export const userRegistration = (req,res) =>{  
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    const {name, role, organisation, emailid} = req.body;
    registrationModel.saveUser(req.body, (result)=>{   
        console.log(result);
        if(result==1)      
            res.status(201).json("User registered successfully");
        else if(result==2)
            res.json("user already registered");
        else
            res.status(400).json(result);
    })    
}

export const checkUserExist = (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const emailid = req.body.emailid;
    registrationModel.checkUserExist(emailid, (result)=>{
        if(result==0)
            res.json("User does not Exist");
        else if(result>0)
            res.json("User Exists");
        else
            res.status(400).json(result);
    })    
}

export function getUserList(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      registrationModel.getUsers((userlist)=>{
        res.json(userlist);
      });      
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
}