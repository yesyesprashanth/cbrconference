import mysqlCon from "../configs/mysql.config.js";
import mysql from 'mysql';


export const saveUser =({emailid, name, role, organisation}, callback) =>{    
    const data = [emailid, name, role, organisation];
    const sql = mysql.format("INSERT INTO cbrconference.registration(emailid, name, role, organisation) VALUES(?,?,?,?)", data);        

    mysqlCon.query(sql, (err, result) =>{
        if(err) {            
            if(err.errno===1062)
                callback(2);
            return;
        }  

        callback(1);
    })
}

export const checkUserExist = (emailid, callback) =>{
    const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.registration WHERE emailid = ?) as count", emailid);
    mysqlCon.query(sql, (err,result)=>{
        if(err) throw err;

        callback(result[0].count==0);        
    });
}