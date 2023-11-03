import mysql from 'mysql2';

const openConnection = () =>{
    const mysqlCon = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: 'cbrconference'
    });
    
    mysqlCon.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            process.exit(1); // Exit the application on connection error
        }
        // } else {
        //     console.log('Database Connected');
        // }
    });

    return mysqlCon;
}


// Function to retrieve data
export const retreiveData = async (sql) => {  
    const mysqlCon = openConnection();    
    try {        
        const [rows] = await mysqlCon.promise().query(sql);
        
        closeConnection(mysqlCon);
        return rows;        
    } catch (error) {
        closeConnection(mysqlCon);     
        console.error('Error while retrieving data:', error)
        return ["Error in Query"]; 
    }   
}

// Function to insert data
export const insertData = async (sql) => {
    
    const mysqlCon = openConnection();
    try {
        const [result] = await mysqlCon.promise().execute(sql);
        closeConnection(mysqlCon);
        return 1; //Successfull saved
    } catch (error) {        
        closeConnection(mysqlCon); 
        if(error.errno===1452) //Foreign key err, user has to register and then upload     
          return 0;
       
        if(error.errno===1062)       
          return 2; //Duplicate Entry        

        return 5;   // Other error 
    }
}

export const countData = async(sql) =>{
    const mysqlCon = openConnection();
    try{        
        const [result] = await mysqlCon.promise().execute(sql);        
        closeConnection(mysqlCon);
        return result[0].count;
    }catch(error){      
        closeConnection(mysqlCon);
        return error.errno;        
    }
}

const closeConnection = (mysqlCon) => {
    // console.log(mysqlCon.state);
    mysqlCon.end((err) => {
        if (err) {
            console.log('Error closing the connection:', err);
        }
        // } else {
        //     console.log('Connection closed');
        // }
    });
}

