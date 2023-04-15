const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Payment = require('../models/payment')
const Site = require('../models/site')
const Work = require('../models/work')
const { response } = require('express')
const {v4: uuid4} = require('uuid')
const Labour = require('../models/labour')
const Material = require('../models/material')
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const path = require('path')




 
 //-----------create payment first step ---------------------
 const createPayment = async (req, res, next)=> {
    console.log("create payment is running....")

       if(req.body.cust_id==null || req.body.date==null || req.body.action==null || req.body.mop==null)
            {  
                res.status(500).json({
                status: "failed",
                message : 'All fields are required(cust_id, date, action, mop)'
                })   
            }
        else{
             let checkCustomerExist = await Customer.findOne({cust_id:req.body.cust_id})
          
              if(!checkCustomerExist){
               res.status(400).json({
                   message : `Customer with id (${req.body.cust_id}) not exist!!`
               }) 
             }
             else{
                   let paymentId = "PY-" + uuid4()
                   let payment =new Payment({
                    payment_id: paymentId,
                    amount:Number(req.body.amount).toFixed(2),
                    cust_id: req.body.cust_id,
                    site_id: req.body.site_id,
                    date: req.body.date,
                    action: req.body.action,
                    mop: req.body.mop,
                    dealer_name:req.body.dealer_name,
                    remark: req.body.remark
                   })
   
                   payment.save()
                   .then(async response => {
                      
                       res.status(200).json({
                           status: "success",
                           message : 'Payment Added Successfully!',
                           data: payment
                       })
                   })
                   .catch(error =>{
                       res.status(402).json({
                           status: "failed",
                           message:'An error Occured!',error
                       })
                   })

                    }
            }
    }

//fetach customer by Id ----------------
const getPaymentByCustId = async (req, res, next) => {
    console.log("get customer by Id ........")
    let customerId = req.params.custId
    try{
    
    const paymentList =await Payment.find({cust_id: customerId}).sort({$natural:-1})
    let totalCreditPayment=0
    let totalDebitPayment=0

   

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Customer with ref id (${customerId}) not exist!!`
        }) 
      }
      else{

        for(let i=0; i<paymentList.length; i++){
            if(paymentList[i].action=="Credit"){
                 totalCreditPayment=totalCreditPayment+ paymentList[i].amount
            }
            else if(paymentList[i].action=="Debit"){
                totalDebitPayment=totalDebitPayment+ paymentList[i].amount
           }
        }
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the payment details",
        data: paymentList,
        length: paymentList.length,
        totalCreditPayment:totalCreditPayment.toFixed(2),
        totalDebitPayment:totalDebitPayment.toFixed(2),
        totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        });
    }
}
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
};

//--update by customer Id ---------------------
const updateCustomer = async (req, res, next)=> {
    console.log("Update custoemr is running....")
    let customerId = req.params.custId
   console.log("ref no", customerId)

   
             let checkCustomerExist = await Customer.findOne({cust_id:customerId})
          
              if(!checkCustomerExist){
               res.status(400).json({
                   message : `Customer with ref id (${customerId}) not exist!!`
               }) 
             }
             else{
                 //  let updatedCustomerDetails = await enquiryService.camelToUnderscore(req.body)

                //   console.log("update enquiry", updatedCustomerDetails)
                   try{
                   await Customer.findByIdAndUpdate(checkCustomerExist._id, {$set: req.body})
                   .then(async response => {
                    let updatedCustomer = await Customer.findOne({cust_id:customerId})
                       res.status(200).json({
                           status: "success",
                           message : 'Customer Updated Successfully!',
                           data: updatedCustomer
                       })
                   })
                }
                   catch(error){
                    console.log("eror ", error)
                       res.status(402).json({
                           status: "failed",
                           message:'An error Occured!',error,
                           details: response
                       })
                   }
               
            }
    }
//fetach all the debit payments-----------------
const getAllPayment = async (req, res, next) => {
    console.log("get overall payment ........")
    
    try{
    
    const paymentList =await Payment.find()
   
    let totalCreditPayment=0
    let totalDebitPayment=0

   

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Payment with ref id not exist!!`,
            data: paymentList,
            length: paymentList.length,
            totalCreditPayment:totalCreditPayment.toFixed(2),
            totalDebitPayment:totalDebitPayment.toFixed(2),
            totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        }) 
      }
      else{

        for(let i=0; i<paymentList.length; i++){
            if(paymentList[i].action=="Credit"){
                 totalCreditPayment=totalCreditPayment+ paymentList[i].amount
            }
            else if(paymentList[i].action=="Debit"){
                totalDebitPayment=totalDebitPayment+ paymentList[i].amount
           }
        }
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the payment details",
        data: paymentList,
        length: paymentList.length,
        totalCreditPayment:totalCreditPayment.toFixed(2),
        totalDebitPayment:totalDebitPayment.toFixed(2),
        totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        })
    }
}
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
  };

//fetach all the debit payments-----------------
const getAllDebitPayment = async (req, res, next) => {
    console.log("get overall payment ........")
    
    try{
    
    const paymentList =await Payment.find({"action":"Debit"})
  
    let totalCreditPayment=0
    let totalDebitPayment=0

   

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Payment with ref id (${customerId}) not exist!!`,
            data: paymentList,
            length: paymentList.length,
            totalCreditPayment:totalCreditPayment.toFixed(2),
            totalDebitPayment:totalDebitPayment.toFixed(2),
            totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        }) 
      }
      else{

        for(let i=0; i<paymentList.length; i++){
            let customerDetails = await Customer.findOne({cust_id:paymentList[i].cust_id})
            paymentList[i].customer_name=customerDetails.name
            let siteDetails = await Site.findOne({site_id:paymentList[i].site_id})
            paymentList[i].site_name=siteDetails.name
            if(paymentList[i].material_id){
                let materialDetails = await Material.findOne({material_id:paymentList[i].material_id})
                let workId=materialDetails.work_id
                let workDetails = await Work.findOne({work_id:workId})
                paymentList[i].work_type=workDetails.work_type
            }
            else if(paymentList[i].labour_id){
                let labourDetails = await Labour.findOne({labour_id:paymentList[i].labour_id})
                let workId=labourDetails.work_id
                let workDetails = await Work.findOne({work_id:workId})
                paymentList[i].work_type=workDetails.work_type
            }
            
        }

        for(let i=0; i<paymentList.length; i++){
            if(paymentList[i].action=="Credit"){
                 totalCreditPayment=totalCreditPayment+ paymentList[i].amount
            }
            else if(paymentList[i].action=="Debit"){
                totalDebitPayment=totalDebitPayment+ paymentList[i].amount
           }
        }
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the payment details",
        data: paymentList,
        length: paymentList.length,
        totalCreditPayment:totalCreditPayment.toFixed(2),
        totalDebitPayment:totalDebitPayment.toFixed(2),
        totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        })
    }
}
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
  };

//download credit payment excel payments-----------------
const downloadDebitPaymentExcel = async (req, res, next) => {
    console.log("get overall credit payment ........")
    
    try{
    
    const paymentList =await Payment.find({"action":"Debit"}).lean()

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Not able to download!!`,
        }) 
      }
      else{
        for(let i=0; i<paymentList.length; i++){
            let customerDetails = await Customer.findOne({cust_id:paymentList[i].cust_id})
            paymentList[i].customer_name=customerDetails.name
            let siteDetails = await Site.findOne({site_id:paymentList[i].site_id})
            paymentList[i].site_name=siteDetails.name
            if(paymentList[i].material_id){
                let materialDetails = await Material.findOne({material_id:paymentList[i].material_id})
                let workId=materialDetails.work_id
                let workDetails = await Work.findOne({work_id:workId})
                paymentList[i].work_type=workDetails.work_type
            }
            else if(paymentList[i].labour_id){
                let labourDetails = await Labour.findOne({labour_id:paymentList[i].labour_id})
                let workId=labourDetails.work_id
                let workDetails = await Work.findOne({work_id:workId})
                paymentList[i].work_type=workDetails.work_type
            }
            
        }    

        await generateExcelFileDebit(await getAttributesByKeys(paymentList, ['date', 'customer_name', 'dealer_name', 'site_name', 'remark','mop', 'work_type',  'amount']))
        
        const directoryPath = path.join(__dirname, "../store/output.xlsx");
  
        res.download(directoryPath, "Expenses-Sheet.xlsx", (error) => {
          if (error) {
            console.log(error);
            res.status(500).send({
              status: "FAILED",
              message: "Could not download the file. ",
              details: "Incorrect entered 'id'",
            });
          }
        });
}
    }
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
  };

//fetach all the debit payments-----------------
const getAllCreditPayment = async (req, res, next) => {
    console.log("get overall credit payment ........")
    
    try{
    
    const paymentList =await Payment.find({"action":"Credit"}).lean()
  
    let totalCreditPayment=0
    let totalDebitPayment=0

   

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Payment with ref id not exist!!`,
            data: paymentList,
            length: paymentList.length,
            totalCreditPayment:totalCreditPayment.toFixed(2),
            totalDebitPayment:totalDebitPayment.toFixed(2),
            totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        }) 
      }
      else{
        for(let i=0; i<paymentList.length; i++){
            let customerDetails = await Customer.findOne({cust_id:paymentList[i].cust_id})
            paymentList[i].customer_name=customerDetails.name
        }    

        for(let i=0; i<paymentList.length; i++){
            if(paymentList[i].action=="Credit"){
                 totalCreditPayment=totalCreditPayment+ paymentList[i].amount
            }
            else if(paymentList[i].action=="Debit"){
                totalDebitPayment=totalDebitPayment+ paymentList[i].amount
           }
        }
        
         
        
        
        let output =await generateExcelFile(await getAttributesByKeys(paymentList, ['date', 'customer_name', 'mop', 'remark', 'amount']))
        
    

    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the payment details",
        data: paymentList,
        length: paymentList.length,
        totalCreditPayment:totalCreditPayment.toFixed(2),
        totalDebitPayment:totalDebitPayment.toFixed(2),
        totalBalancePayment:(totalCreditPayment.toFixed(2)-totalDebitPayment.toFixed(2)).toFixed(2)
        })
    }
}
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
  };

//download credit payment excel payments-----------------
const downloadCreditPaymentExcel = async (req, res, next) => {
    console.log("get overall credit payment ........")
    
    try{
    
    const paymentList =await Payment.find({"action":"Credit"}).lean()

    if(!paymentList){
        res.status(400).json({
            status: "failed",
            message : `Not able to download!!`,
        }) 
      }
      else{
        for(let i=0; i<paymentList.length; i++){
            let customerDetails = await Customer.findOne({cust_id:paymentList[i].cust_id})
            paymentList[i].customer_name=customerDetails.name
        }    

        await generateExcelFile(await getAttributesByKeys(paymentList, ['date', 'customer_name', 'mop', 'remark', 'amount']))
        
        const directoryPath = path.join(__dirname, "../store/output.xlsx");
  
        res.download(directoryPath, "Incom-Sheet.xlsx", (error) => {
          if (error) {
            console.log(error);
            res.status(500).send({
              status: "FAILED",
              message: "Could not download the file. ",
              details: "Incorrect entered 'id'",
            });
          }
        });
}
    }
   catch(error){
       console.log(error);
       res.status(500).json({
           status: "Failed",
           message: "an error occured",
           error:error
       });
   }
  };





      //  Delete payment by payment Id
      const deletePayment =async (req, res, next)=>{
        console.log("delete payment is running.....")
        let paymentId = req.params.paymentId;
    
        let checkPaymentExist = await Payment.findOne({payment_id:paymentId})
       
      
      if(!checkPaymentExist){
          res.status(400).json({
              status: "failed",
              message : `Payment with id (${paymentId}) is not exist!!`
          }) 
      }
      else{
        
        await Payment.findByIdAndRemove(checkPaymentExist._id)
        .then(async()=>{
            if(checkPaymentExist.labour_id){
                await Labour.findOneAndRemove({"labour_id":checkPaymentExist.labour_id})
            }
            else if(checkPaymentExist.material_id){
                await Material.findOneAndRemove({"material_id":checkPaymentExist.material_id})
            }
            res.status(200).json({
                status: "success",
                message: 'Payment deleted successfully!',
                userId: paymentId
            })
        })
        .catch(error =>{
            res.status(400).json({
                status: "failed",
                message:'An error Occured!',
                error: error
            })
        })
    }
    }   

    // async function generateExcelFile(data) {
       
    //    // console.log("here is the data", data, Object.keys(data[1]))
    //     const headers = Object.keys(data[0]);
    //     console.log("here is the headers", headers)
    //     const rows = data.map(obj => Object.values(obj));
    //   //  console.log("here si the rows", rows)
    //     const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    //     XLSX.writeFile(workbook, './store/output.xlsx');
    //   }
    

    async function generateExcelFile(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
      
        // Add the headers row in uppercase
        const headers = Object.keys(data[0]).map(header => header.toUpperCase());
        worksheet.addRow(['Sr. No.', ...headers]);
      
        // Add the data rows with serial numbers
        for (let i = 0; i < data.length; i++) {
          worksheet.addRow([i + 1, ...Object.values(data[i])]);
          
        }

        // Enable text wrapping and autofilter
            worksheet.eachRow(row => {
                row.eachCell(cell => {
               console.log("here is the cell", cell)
                cell.alignment = { wrapText: true };
                });
            });
                 // Set header style
                const headerRow = worksheet.getRow(1);
                headerRow.font = { bold: true };
                headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF808080' } };

            
        // Set the width of the first column
           worksheet.getColumn(1).width = 10;
           worksheet.getColumn(2).width = 20;
           worksheet.getColumn(3).width = 20;
           worksheet.getColumn(4).width = 15;
           worksheet.getColumn(5).width = 30;
           worksheet.getColumn(6).width = 20;
      
        //Generate the Excel file
        return workbook.xlsx.writeFile('./store/output.xlsx');
      }
    
      async function generateExcelFileDebit(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
      
        // Add the headers row in uppercase
        const headers = Object.keys(data[0]).map(header => header.toUpperCase());
        worksheet.addRow(['Sr. No.', ...headers]);
      
        // Add the data rows with serial numbers
        for (let i = 0; i < data.length; i++) {
          worksheet.addRow([i + 1, ...Object.values(data[i])]);
        }
      
        // Set the width of the first column
           worksheet.getColumn(1).width = 10;
           worksheet.getColumn(2).width = 20;
           worksheet.getColumn(3).width = 25;
           worksheet.getColumn(4).width = 25;
           worksheet.getColumn(5).width = 20;
           worksheet.getColumn(6).width = 35;
           worksheet.getColumn(7).width = 20;
           worksheet.getColumn(8).width = 15;
           worksheet.getColumn(9).width = 20;

           // Enable text wrapping and autofilter
           worksheet.eachRow(row => {
            row.eachCell(cell => {
           console.log("here is the cell", cell)
            cell.alignment = { wrapText: true };
            });
        });

           // Set header style
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF808080' } };

      
        //Generate the Excel file
        return workbook.xlsx.writeFile('./store/output.xlsx');
      }
    
    

    async function getAttributesByKeys(objects, keysToRetrieve) {
        return objects.map(obj => {
          const newObj = {};
          keysToRetrieve.forEach(key => {
            if (obj.hasOwnProperty(key)) {
              newObj[key] = obj[key];
            }
          });
          return newObj;
        });
      }
      


    module.exports={
        getPaymentByCustId, createPayment, getAllDebitPayment, getAllCreditPayment, deletePayment, getAllPayment,
        downloadCreditPaymentExcel, downloadDebitPaymentExcel
    }