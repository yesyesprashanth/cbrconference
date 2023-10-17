import mysqlCon from '../configs/mysql.config.js';
import mysql from 'mysql2';


export const saveFeedback = ({name, email, subject, message}, callback) =>{
    
        const sql= mysql.format("INSERT INTO cbrconference.feedback(emailid, name, subject, message) values(?,?,?,?)");
        const data = [email, name, subject, message];

        mysqlCon.query(sql, data, (err, result)=>{
            if(err){                
                throw err;
                callback(0)
            } 

            callback(result.length);        
        })  
}

export const getFeedbackList = (callback) =>{
   
        const sql = mysql.format("SELECT * FROM cbrconference.feedback");        
        mysqlCon.query(sql, (err, result)=>{
            if(err) throw err;
            callback(result);
        })
   
}

