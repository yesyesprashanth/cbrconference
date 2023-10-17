import * as feedbackModel  from '../models/feedback.model.js'

export const saveFeedback =(req,res) =>{    
   feedbackModel.saveFeedback(req.body, (result)=>{
        if(result==0)
            res.json("Failed to Save");
        else
            res.json("Saved Successfully");
    });    
}

export const getFeedbackList = (req,res) =>{
    feedbackModel.getFeedbackList((result)=>{
        res.json(result);
    });
}



