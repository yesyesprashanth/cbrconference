import mysql from 'mysql2';
import { retreiveData, insertData } from './model.util.js';



export const saveFeedback = async ({name, emailid, subject, message}, callback) =>{

        try{      
            console.log(name, emailid, subject, message);
            if(emailid!="" && name!="" && subject!="" && message!="")
            {
                const data = [emailid, name, subject, message];
                const sql= mysql.format("INSERT INTO cbrconference.feedback(emailid, name, subject, message) values(?,?,?,?)", data);
               
                const executionCode = await insertData(sql);        
                callback(executionCode);          
            }else{
                callback("Please fill all the details");
            }
        }catch(err){            
            callback(err.message);
        }

        
}

export const getFeedbackList = async (callback) =>{
    try{
        const sql = mysql.format("SELECT * FROM cbrconference.feedback");    
        const result = await retreiveData(sql);
        callback(result);

    }catch(err){
        console.log("feedback.model err", err.message);
        callback(err.message);
    }   
}

