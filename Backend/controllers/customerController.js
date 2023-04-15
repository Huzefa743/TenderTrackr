const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Site = require('../models/site')
const Work = require('../models/work')
const { response } = require('express')
const {v4: uuid4} = require('uuid')



 
 //-----------create customer first step ---------------------
 const createCustomer = async (req, res, next)=> {
    console.log("create customer is running....")

       if( req.body.name==null)
                {  
                res.status(500).json({
                    status: "failed",
                    message : 'All fields are required(name, address, email, mobile)'
                })   
                }
        else{
             let checkCustomerExist = await Customer.findOne({name:req.body.name})
          
              if(checkCustomerExist){
               res.status(400).json({
                   message : `Customer with same name (${req.body.name}) already exist!!`
               }) 
             }
             else{
                   let customerId = "CUST" + uuid4()
                   let customer =new Customer({
                    cust_id: customerId,
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    gst:req.body.gst
                   })
   
                   customer.save()
                   .then(async response => {
                      
                       res.status(200).json({
                           status: "success",
                           message : 'Customer Added Successfully!',
                           data: customer
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
const getCustomerById = async (req, res, next) => {
    console.log("get customer by Id ........")
    let customerId = req.params.custId
    try{
    
    const customerDetails =await Customer.findOne({cust_id: customerId})

    if(!customerDetails){
        res.status(400).json({
            status: "failed",
            message : `Customer with ref id (${customerId}) not exist!!`
        }) 
      }
      else{
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the customer detail",
        data: customerDetails 
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

//fetach all the customer-----------------
const getAllCustomer = async (req, res, next) => {
    console.log("get list of all user ........")
    try{
    
   
    const {page =1 , limit =5} =req.query;
    
     let customerList =await Customer.find();

     for(let i=0; i<customerList.length; i++){
        let siteList = await Site.find({cust_id:customerList[i].cust_id})
       
        customerList[i].sites=siteList
     }
     for(let i=0; i<customerList.length; i++){
        let workList = await Work.find({cust_id:customerList[i].cust_id})
       
        customerList[i].work=workList
     }
     let totalInDb =await Customer.find()
  
    
     
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the list of customer",
        totalInDb:totalInDb.length,
        total: customerList.length,
        data: customerList
        });
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

      //  Delete customer by customer Id
      const deleteCustomer =async (req, res, next)=>{
        console.log("delete customer is running.....")
        let customerId = req.params.custId;
    
        let checkCustomerExist = await Customer.findOne({cust_id:customerId})
       
      
      if(!checkCustomerExist){
          res.status(400).json({
              status: "failed",
              message : `Customer with id (${customerId}) is not exist!!`
          }) 
      }
      else{
        
        await Customer.findByIdAndRemove(checkCustomerExist._id)
        .then(()=>{
            res.status(200).json({
                status: "success",
                message: 'Customer deleted successfully!',
                userId: customerId
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


    module.exports={
        createCustomer, getCustomerById, updateCustomer, getAllCustomer, deleteCustomer
    }