const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Site = require('../models/site')
const Work = require('../models/work')
const Material = require('../models/material')
const Labour = require('../models/labour')
const { response } = require('express')
const {v4: uuid4} = require('uuid')



 
 //-----------create labour    ---------------------
 const createLabour = async (req, res, next)=> {
    console.log("create labour is running....")

    let customerId = req.params.custId
    let siteId = req.params.siteId
    let workId = req.params.workId

    let checkCustomerExist = await Customer.findOne({cust_id:customerId})
          
    if(!checkCustomerExist){
     res.status(400).json({
         message : `Customer with Id (${customerId}) not exist!!`
     }) 
   }
   else{
        let checkSiteExist = await Site.findOne({site_id:siteId})
            
        if(!checkSiteExist){
        res.status(400).json({
            message : `Site with Id (${siteId}) not exist!!`
        }) 
        }
        else{
            let checkWorkExist = await Work.findOne({work_id:workId})
            
            if(!checkWorkExist){
            res.status(400).json({
                message : `Work with Id (${workId}) not exist!!`
            }) 
            }
            else{
                if( req.body.purpose==null || req.body.qty==null || req.body.from_date==null || req.body.to_date==null)
                {  
                res.status(500).json({
                    status: "failed",
                    message : 'All fields are required(name, qty, price, mop)'
                })   
                }
            else{
            
                let labourId = "LAB-" + uuid4()
                let labour =new Labour({
                    labour_id: labourId,
                    purpose: req.body.purpose,
                    qty: req.body.qty,
                    from_date:req.body.from_date,
                    to_date:req.body.to_date,
                    price:req.body.price,
                    mop:req.body.mop,
                    cust_id: customerId,
                    site_id: siteId,
                    work_id:workId
                })

                labour.save()
                .then(async response => {
                    
                    res.status(200).json({
                        status: "success",
                        message : 'Labour Added Successfully!',
                        data: labour
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
   }
    

      
    }

//fetach Labour by Id ----------------
const getLabourById = async (req, res, next) => {
    console.log("get Labour by Id ........")
    let labourId = req.params.labourId
    try{
    
    const labourDetails =await Labour.findOne({labour_id: labourId})

    if(!labourDetails){
        res.status(400).json({
            status: "failed",
            message : `Labour with ref id (${labourId}) not exist!!`
        }) 
      }
      else{
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the labour details",
        data: labourDetails 
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

//--update by Labour by Labour Id ---------------------
const updateLabour = async (req, res, next)=> {
    console.log("Update Labour is running....")

    let labourId = req.params.labourId
        console.log("labourId no", labourId)

   
             let checkLabourExist = await Labour.findOne({labour_id:labourId})
          
              if(!checkLabourExist){
               res.status(400).json({
                   message : `Labour with ref id (${labourId}) not exist!!`
               }) 
             }
             else{
                    try{
                   await Labour.findByIdAndUpdate(checkLabourExist._id, {$set: req.body})
                   .then(async response => {
                    let updatedLabour = await Labour.findOne({labour_id:labourId})
                       res.status(200).json({
                           status: "success",
                           message : 'Labour Updated Successfully!',
                           data: updatedLabour
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

//fetach all the Labour for work-----------------
const getAllLabour = async (req, res, next) => {
    console.log("get list of all labour by work id ........")
    let workId = req.params.workId
    try{
    
   
    
    
     let labourList =await Labour.find({work_id:workId})
  
    
     
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the list of labour",
        
        total: labourList.length,
        data: labourList
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

      //  Delete Labour by labour Id
      const deleteLabour =async (req, res, next)=>{
        console.log("delete Labour by Labour id is running.....")
        let labourId = req.params.labourId;
    
        let checkLabourExist = await Labour.findOne({labour_id:labourId})
       
      
      if(!checkLabourExist){
          res.status(400).json({
              status: "failed",
              message : `Labour with id (${labourId}) is not exist!!`
          }) 
      }
      else{
        
        await Labour.findByIdAndRemove(checkLabourExist._id)
        .then(()=>{
            res.status(200).json({
                status: "success",
                message: 'Labour deleted successfully!',
                labourId: labourId
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
        createLabour, getLabourById, updateLabour, getAllLabour, deleteLabour
    }