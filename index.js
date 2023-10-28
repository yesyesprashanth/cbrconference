import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysqlCon from './configs/mysql.config.js';
dotenv.config();

import feedbackRoute from './routes/feedback.route.js';
import paymentRoute from './routes/payment.route.js';
import registrationRoute from './routes/registration.route.js';
import manuscriptRoute from './routes/manuscript.route.js'

const app = express();
const port = process.env.port|3005;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// const corsOptions = {
//     origin: '*', //process.env.CORS_ORIGIN, 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // To allow cookies and authentication headers
//   };
  
app.use(cors());

app.use(express.static('uploads'));

app.use('/feedback', feedbackRoute);
app.use('/payment', paymentRoute);
app.use('/registration', registrationRoute);
app.use('/manuscript', manuscriptRoute);


app.get('/', (req,res)=>{
    res.json("cbr conference backend");
});

app.listen(port, ()=>console.log(`server is up at http://localhost:${port}`));

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server and database connection...');
  server.close(() => {
    // Close the database connection
    mysqlCon.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err);
      } else {
        console.log('Database connection closed.');
        process.exit(0);
      }
    });
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);

  // Close the database connection
  mysqlCon.end((dbErr) => {
    if (dbErr) {
      console.error('Error closing the database connection:', dbErr);
    } else {
      console.log('Database connection closed.');
      process.exit(1);
    }
  });
});
