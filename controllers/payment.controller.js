import * as paymentModel from '../models/payment.model.js';


export const savePayment = (req,res) =>{    

    console.log(req.file);
    
    const data = {
        emailid :req.body.emailid,
        uid: req.body.UID,
        receipt : req.file.path,
        filename: req.file.originalname
    }
     
    paymentModel.savePayment(data, (result)=>{
        if(result==1)
            res.json("File Uploaded successfully");
        else if(result==2)
            res.json("Please register and then try to upload the file");
        else
            res.json("payment details already exists");            
    });
}

export const checkPayment = (req,res) =>{
    const emailid = req.body.emailid;    
    paymentModel.checkPayment(emailid, (result)=>{
        if(result==0)
            res.json("payment details does not exist");
        else
            res.json("payment details exist");
    });  
}

export const readReceipt = (req,res) =>{
        const emailid = "santhosh@gmail.com";
        paymentModel.readReceipt(emailid, (result)=>{
        //     // Set the appropriate content type based on the file type (e.g., for a Word document)
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        // // Set the content disposition header to prompt a download with the desired file name
        // res.setHeader('Content-Disposition', `attachment; filename="downloaded-document.docx"`);

        // Send the blob data as the response
        console.log(result);
        res.send(result);
    });    
}

// Controller function to get the payment list
export const getPaymentList = (req, res) => {
    try {
      paymentModel.getPaymentList((data)=>{
        res.status(200).json(data);
      });      
    } catch (error) {        
      console.error('Error fetching payment list:', error);
      res.status(500).json({ error: 'An error occurred while fetching payment data.' });
    }
}