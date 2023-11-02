import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const mysqlCon = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: 'cbrconference'
});

mysqlCon.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected");
    
    let sql;
    //Create Database    
    sql = mysql.format("CREATE DATABASE IF NOT EXISTS cbrconference");
    mysqlCon.query(sql, (err)=>{
        if(err) throw err;
    });

     //Create Tables
    //Feedback (Name, Email, Subject, Message)
    sql = mysql.format("CREATE TABLE IF NOT EXISTS cbrconference.feedback(emailid VARCHAR(80) NOT NULL , name VARCHAR(100), subject VARCHAR(100), message TEXT)");
    mysqlCon.query(sql, (err)=>{
        if(err) throw err;
    });

    sql = mysql.format("CREATE TABLE IF NOT EXISTS cbrconference.registration(emailid VARCHAR(80) NOT NULL , name VARCHAR(100) NOT NULL , role VARCHAR(50) NOT NULL, organisation TEXT NOT NULL, PRIMARY KEY(emailid))");
    mysqlCon.query(sql, (err)=>{
        if(err) throw err;
    });

    //Payment (Email, UID, Payment Receipt)
    sql = mysql.format("CREATE TABLE IF NOT EXISTS cbrconference.payment(emailid VARCHAR(80) NOT NULL, UID VARCHAR(50), receipt LONGBLOB, filename VARCHAR(50), FOREIGN KEY(emailid) REFERENCES cbrconference.registration(emailid))");
    mysqlCon.query(sql, (err)=>{
        if(err) throw err;
    });

    //Papers (Email, Abstract, Plagarism Report, FullReport)
    sql = mysql.format("CREATE TABLE IF NOT EXISTS cbrconference.manuscript(emailid VARCHAR(80), abstractpaper LONGBLOB, abstractfilename VARCHAR(50), plagiarismreport LONGBLOB, plagarismfilename VARCHAR(50), fullpaper LONGBLOB, fullpapaerfilename VARCHAR(50),  FOREIGN KEY(emailid) REFERENCES cbrconference.registration(emailid))");
    mysqlCon.query(sql, (err)=>{
        if(err) throw err;
    });   

    mysqlCon.end((err) => {
        if (err) {
            console.log("Error closing the connection:", err);
        } else {
            console.log("Connection closed");
        }
    });
});


export default mysqlCon;