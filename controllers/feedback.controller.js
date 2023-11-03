import * as feedbackModel  from '../models/feedback.model.js'

export const saveFeedback =(req,res) =>{    
   res.setHeader('Access-Control-Allow-Origin', '*');   
   feedbackModel.saveFeedback(req.body, (result)=>{       
        if(result>0)
            res.status(201).json("Saved Successfull");
        else
            res.json(result);        
    });    
}

export const getFeedbackList = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    feedbackModel.getFeedbackList((result)=>{
        res.json(result);
    });
}



