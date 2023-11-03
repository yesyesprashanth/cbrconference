import * as paymentModel from '../models/payment.model.js';


export const savePayment = (req,res) =>{    
    // res.setHeader('Access-Control-Allow-Origin', '*');
   
    const data = {
        emailid :req.body.emailid,
        uid: req.body.UID,
        receipt : req.file.path,
        filename: req.file.originalname
    }  
     
    paymentModel.savePayment(data, (result)=>{           
        if(result == 0)
            res.json("Please register and then try to upload the file");         
        if(result==1)
            res.status(201).json("Payment details Uploaded successfully");
        else if(result==2)
            res.json("Payment details already exists");            
        else 
            res.status(400).json(result);                        
    });
}

export const checkPayment = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const emailid = req.body.emailid;    
    paymentModel.checkPayment(emailid, (result)=>{
        if(result==0)
            res.json("payment details does not exist");
        else
            res.json("payment details exist");
    });  
}

export const readReceipt = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
        const emailid = "hemanth@gmail.com";   
        paymentModel.readReceipt(emailid, (result)=>{              
        res.send(result);
    });    
}

export const downloadReceipt = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const emailid = req.query.emailid;   
    paymentModel.readReceipt(emailid, (result)=>{        
    res.send(result);
});    
}

export const postReceipt = (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
        const emailid = req.body.body.emailid;    
        paymentModel.readReceipt(emailid, (result)=>{      
        res.send(result);
    });    
}

// Controller function to get the payment list
export const getPaymentList = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        paymentModel.getPaymentList((data)=>{
        res.status(200).json(data);
      });      
    } catch (error) {        
      console.error('Error fetching payment list:', error);
      res.status(500).json({ error: 'An error occurred while fetching payment data.' });
    }
}