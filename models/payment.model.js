import mysql from 'mysql2';
import { countData, retreiveData } from './model.util.js';
import mysqlCon from '../configs/mysql.config.js';
import fs from 'fs';

export const savePayment = ({emailid, uid, receipt, filename}, callback) =>{               
    try{    
        fs.readFile(receipt, (err, fileData) =>{
            if(err) throw err;

            const data = [emailid,uid,fileData, filename];

            //Check if the record exist
            checkPayment(emailid, async (isexist)=>{            
                if(isexist==0)
                {
                    const sql = mysql.format("INSERT INTO cbrconference.payment(emailid, uid, receipt, filename) VALUES(?,?,?, ?)",data);
                    // const executionCode = await insertData(sql); 
                    // callback(executionCode);

                    mysqlCon.query(sql, (err)=>{                        
                        console.log(err);
                        if(err) 
                        {                
                            if(err.errno==1452) //Foreign key err, user has to register and then upload     
                            {                           
                                callback(3);
                                return;
                            }
                           callback(err.message);                        
                        }
                        else
                        {                                
                            callback(1);
                            return;
                        }                     
                    });                           
                }else{
                    callback(0);
                }                
            })
        });
    }catch(err){
        callback(err.message);
    }
}

export const checkPayment = (emailid, callback) => {
   
    try{
        const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.payment WHERE emailid = ?) as count", emailid);        
        const count = countData(sql);
        callback(result[0].count);
    }catch(err){
        callback(err.message);
    }

}

export const readReceipt = (emailid, callback) =>{
    
    try{
            const query = 'SELECT receipt FROM cbrconference.payment WHERE emailid = ?';
            const eamilid = emailid;
        
            mysqlCon.query(query, [eamilid], (err, results) => {
                if (err) {
                    callback(err.message);
                    return;
                }
            
                if (results.length === 0) {
                    console.log('No data found for the specified emaildid.');
                    return;
                }
            
                // Retrieve the BLOB data from the results
                const blobData = results[0].receipt;
                callback(blobData);              
            });  
    }catch(err){
        callback(err.message);
    }
}

export async function getPaymentList(callback) {        
    try {       
      const sql = 'SELECT emailid, uid, filename FROM cbrconference.payment';
      const paymentList = await retreiveData(sql);
      callback(paymentList);
        // mysqlCon.query(sql, (err, result)=>{
        //     if(err) {
        //         callback(err.message);
        //         return;
        //     }
           
        //     callback(result);         
        // });      
    } catch (err) {      
      callback(err.message);
    } 
}

