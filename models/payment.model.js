import mysql from 'mysql';
import mysqlCon from '../configs/mysql.config.js';
import fs from 'fs';

export const savePayment = ({emailid, uid, receipt}, callback) =>{               
    let sql;
    fs.readFile(receipt, (err, fileData) =>{
            if(err) throw err;

            const data = [emailid,uid,fileData];

            //Check if the record exist
            checkPayment(emailid, (isexist)=>{            
                if(isexist==0)
                {
                    sql = mysql.format("INSERT INTO cbrconference.payment(emailid, uid, receipt) VALUES(?,?,?)",data);
                    mysqlCon.query(sql, (err)=>{                        
                        if(err) 
                        {                
                            if(err.errno==1452) //Foreign key err, user has to register and then upload
                                callback(2);
                        }
                        else
                        {                                
                            callback(1);
                        }
                    });                           
                }else{
                    callback(3);
                }
                
            })
        });
}

export const checkPayment = (emailid, callback) => {
   
        const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.payment WHERE emailid = ?) as count", emailid);        
        mysqlCon.query(sql, (err, result)=>{
            if(err) throw err;

            callback(result[0].count);
        });

}

export const readReceipt = (emailid, callback) =>{
    
        const query = 'SELECT receipt FROM cbrconference.payment WHERE emailid = ?';
        const eamilid = "hello@gmail.com";
      
        mysqlCon.query(query, [eamilid], (error, results) => {
          if (error) {
            console.error(`Error retrieving BLOB data from the database: ${error}`);
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
}