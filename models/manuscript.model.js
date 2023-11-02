import mysqlCon from "../configs/mysql.config.js";
import mysql from 'mysql2';
import { retreiveData } from "./model.util.js";
import fs from 'fs';


export const saveAbstract = ({emailid, abFile, filename}, callback) =>{
    try{
        fs.readFile(abFile, (err, fileData) =>{
            if(err) throw err;            
                checkAbstract(emailid, isExist=>{
                    if(isExist==0)
                    {
                        const data = [emailid, fileData, filename];               
                        const sql = mysql.format("INSERT INTO cbrconference.manuscript(emailid, abstractpaper, abstractfilename) VALUES(?,?, ?)",data);
                        
                        mysqlCon.query(sql, (err, result)=>{
                            if(err){
                                if(err.errno==1452) //Foreign key err, user has to register and then upload
                                {
                                    callback(2);
                                    return;
                                }
                             
                               callback(err.message);
                            }else{
                                callback(1); //registered successfully
                            }
                        }); 


                    }else{
                        callback(3) //Abstract already exists
                    }                  
                });
            });
        }catch(err){
            callback(err.message);
        }
}
    
export const checkAbstract = (emailid, callback) =>{
    try{
        const sql = mysql.format("SELECT EXISTS(SELECT * FROM cbrconference.manuscript WHERE emailid = ?) as count", emailid);
        mysqlCon.query(sql, (err, result)=>{
            if(err){
                callback(err.message);
                return;
            }

            callback(result[0].count);           
        });
    }catch(err){
        callback(err.message)
    } 
}



export const saveFullpaper = ({emailid, pgFile, file1, fpFile, file2}, callback) =>{   
    try{    
        fs.readFile(pgFile, (err, fileData1)=>{    
            if(err)  callback(2);
            fs.readFile(fpFile, (err, fileData2)=>{           
                if(err)  callback(2);
                checkAbstract(emailid, (isExist)=>{                
                    if(isExist==1){                                       
                        const queryData = [fileData1, file1, fileData2, file2, emailid]
                        const sql = mysql.format("UPDATE cbrconference.manuscript set plagiarismreport = ?, plagarismfilename = ?, fullpaper = ?, fullpapaerfilename = ? where emailid = ?",  queryData);
                        mysqlCon.query(sql, (err, result)=>{                       
                            if(err) {                            
                                if(err.errno == 1452)
                                {
                                    callback(3);
                                    return;
                                }

                               callback(err.message)                               
                            }else{
                                callback(1)                              
                            }                          
                        })
                    }else{
                        callback(2);                        
                    }
                })
            })
        })  
    }catch(err){
        callback(err.message);
    }
}

export async function getMaunscriptList(callback){
    try{    
        const sql = "select emailid, abstractfilename as filename1, plagarismfilename as filename2, fullpapaerfilename as filename3 from cbrconference.manuscript";
        // mysqlCon.query(sql, (err, result)=>{
        //     if(err) {
        //         callback(err.message);
        //         return;
        //     }
        //     callback(result);                       
        // });

        const manuscriptlist = await retreiveData(sql);
        callback(manuscriptlist);

    } catch (err) {
       callback(err.message);
  } 
}

export const getManuscriptBlob = (emailid, fieldname, callback) =>{
    const sql = mysql.format('SELECT ?? as file FROM cbrconference.manuscript WHERE emailid = ?', [fieldname, emailid]);    
    try{        
        mysqlCon.query(sql, (err, result)=>{
            if(err) {
                callback(err.message);
                return;
            }
            callback(result[0].file);
          
        });
    }catch (err) {
        callback(err.message);
    }
    
}
