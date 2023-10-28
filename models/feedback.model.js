import mysqlCon from '../configs/mysql.config.js';
import mysql from 'mysql2';


export const saveFeedback = ({name, emailid, subject, message}, callback) =>{

        try{
            const sql= mysql.format("INSERT INTO cbrconference.feedback(emailid, name, subject, message) values(?,?,?,?)");
            const data = [emailid, name, subject, message];
            
            mysqlCon.query(sql, data, (err, result)=>{
                if(err){                               
                    callback(err.message);
                    return;             
                } 
                
                callback(result.length);                   
            })  
        }catch(err){
            callback(err.message);
        }
}

export const getFeedbackList = (callback) =>{
   
    try{
        const sql = mysql.format("SELECT * FROM cbrconference.feedback");        
        mysqlCon.query(sql, (err, result)=>{
            if(err) {
                callback(err.message);
                return;
            }
            callback(result);          
        })
    }catch(err){
        callback(err.message);
    }   
}

