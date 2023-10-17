import * as paymentModel from '../models/payment.model.js';


export const savePayment = (req,res) =>{    
    
    const data = {
        emailid :req.body.emailid,
        uid: req.body.uid,
        receipt : req.file.path
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
        const emailid = "hello@gmail.com";
        paymentModel.readReceipt(emailid, (result)=>{
            // Set the appropriate content type based on the file type (e.g., for a Word document)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        // Set the content disposition header to prompt a download with the desired file name
        res.setHeader('Content-Disposition', `attachment; filename="downloaded-document.docx"`);

        // Send the blob data as the response
        res.end(result);
    });    
}