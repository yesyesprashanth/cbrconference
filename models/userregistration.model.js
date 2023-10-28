import mysqlCon from "../configs/mysql.config.js";
import mysql from 'mysql2';


export const saveUser =({name, role, organization, emailid}, callback) =>{        
    try{
        const data = [emailid, name, role, organization];   
        const sql = mysql.format("INSERT INTO cbrconference.registration(emailid, name, role, organisation) VALUES(?,?,?,?)", data);        
    
        mysqlCon.query(sql, (err, result) =>{
            if(err) {            
                if(err.errno===1062)
                {
                    callback(2);
                    return;
                }
                callback(err.message);
            }  
            callback(1);
        })
    }catch(err){
        callback(err.message);
    }
}

export const checkUserExist = (emailid, callback) =>{
    try{
        const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.registration WHERE emailid = ?) as count", emailid);
        mysqlCon.query(sql, (err,result)=>{
            if(err) {
                callback(err.message);
                return;
            }  
    
            callback(result[0].count==0);        
        });
    }catch(err){
        callback(err.message);
    }
}

export function getUsers(callback) {
    try {
      
        mysqlCon.query('SELECT emailid, name, role, organisation FROM cbrconference.registration', (err, userlist)=>{
            if(err) {
                callback(err.message);
                return;
            }            
            callback(userlist);
        });      
    } catch (err) {
        callback(err.message);
    }
  }
  