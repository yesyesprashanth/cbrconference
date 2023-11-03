// import mysqlCon from "../configs/mysql.config.js";
import mysql from 'mysql2';
import { insertData, retreiveData, countData } from './model.util.js';


export const saveUser = async ({name, role, organization, emailid}, callback) =>{        
    try{
        const data = [emailid, name, role, organization];   
        const sql = mysql.format("INSERT INTO cbrconference.registration(emailid, name, role, organisation) VALUES(?,?,?,?)", data);         
        const executionCode = await insertData(sql);
        callback(executionCode);      
    }catch(error){       
        callback(error);
    }
}

export const checkUserExist = async (emailid, callback) =>{
    try{        
        const sql = mysql.format("SELECT COUNT(*) as count FROM cbrconference.registration WHERE emailid = ?", emailid);
       
        const count = await countData(sql);        
        callback(count);
    }catch(err){              
        callback(err.message);
    }
}

export async function getUsers(callback) {
    try {
        const sql = mysql.format('SELECT emailid, name, role, organisation FROM cbrconference.registration')
        const userList = await retreiveData(sql);
        callback(userList);      
    } catch (err) {
        callback(err.message);
    }
  }
  