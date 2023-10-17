import mysqlCon from "../configs/mysql.config.js";
import mysql from 'mysql2';
import fs from 'fs';


export const saveAbstract = ({emailid, abFile}, callback) =>{

    fs.readFile(abFile, (err, fileData) =>{
        if(err) throw err;

        checkAbstract(emailid, isExist=>{
            if(isExist==0)
            {
                const data = [emailid, fileData];
                const sql = mysql.format("INSERT INTO cbrconference.manuscript(emailid, abstractpaper) VALUES(?,?)",data);
        
                mysqlCon.query(sql, (err, result)=>{
                    if(err){
                        if(err.errno==1452) //Foreign key err, user has to register and then upload
                            callback(2);
                    }else{
                        callback(1); //registered successfully
                    }
                }); 
            }else{
                callback(3) //Abstract already exists
            }
        });
    });
}

export const checkAbstract = (emailid, callback) =>{
    const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.manuscript WHERE emailid = ?) as count", emailid);
    mysqlCon.query(sql, (err, result)=>{
        if(err)
            throw err;

        callback(result[0].count);
    });
}



export const saveFullpaper = ({emailid, pgFile, fpFile}, callback) =>{
    const files = [pgFile, fpFile];
    fs.readFile(files[0], (err, fileData1)=>
        fs.readFile(files[1], (err, fileData2)=>{
           
            checkAbstract(emailid, (isExist)=>{                
                if(isExist==1){                                       
                    const queryData = [fileData1, fileData1, emailid]
                    const sql = mysql.format("UPDATE cbrconference.manuscript set plagiarismreport = ?, fullpaper = ? where emailid = ?",  queryData);
                    mysqlCon.query(sql, (err, result)=>{
                        // console.log(err, result);
                        if(err) {                            
                            if(err.errno == 1452)
                                callback(2);
                        }else{
                            callback(1)
                        }
                    })
                }else{
                    callback(3);
                }                
            })

        })
    )
    
}

