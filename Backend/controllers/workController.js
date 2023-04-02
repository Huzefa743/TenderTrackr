const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Site = require('../models/site')
const Work = require('../models/work')
const { response } = require('express')
const {v4: uuid4} = require('uuid')



 
 //-----------create work    ---------------------
 const createWork = async (req, res, next)=> {
    console.log("create work is running....")

    let customerId = req.params.custId
    let siteId = req.params.siteId

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

            if( req.body.description==null || req.body.work_type==null || req.body.estimate_days==null)
                {  
                res.status(500).json({
                    status: "failed",
                    message : 'All fields are required(description, work type, estimate days)'
                })   
                }
            else{
           
                let workId = "WORK-" + uuid4()
                let work =new Work({
                    work_id: workId,
                    description: req.body.description,
                    work_type: req.body.work_type,
                    estimate_days:req.body.estimate_days,
                    status:req.body.status,
                    cust_id: customerId,
                    site_id: siteId
                })

                work.save()
                .then(async response => {
                    
                    res.status(200).json({
                        status: "success",
                        message : 'Work Added Successfully!',
                        data: work
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

//fetach work by Id ----------------
const getWorkById = async (req, res, next) => {
    console.log("get work by Id ........")
    let workId = req.params.workId
    try{
    
    const workDetails =await Work.findOne({work_id: workId})

    if(!workDetails){
        res.status(400).json({
            status: "failed",
            message : `Work with ref id (${workId}) not exist!!`
        }) 
      }
      else{
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the work details",
        data: workDetails 
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

//--update by work Id ---------------------
const updateWork = async (req, res, next)=> {
    console.log("Update work is running....")

    let workId = req.params.workId
        console.log("ref no", workId)

   
             let checkWorkExist = await Work.findOne({work_id:workId})
          
              if(!checkWorkExist){
               res.status(400).json({
                   message : `Work with ref id (${workId}) not exist!!`
               }) 
             }
             else{
                    try{
                   await Work.findByIdAndUpdate(checkWorkExist._id, {$set: req.body})
                   .then(async response => {
                    let updatedWork = await Work.findOne({work_id:workId})
                       res.status(200).json({
                           status: "success",
                           message : 'Work Updated Successfully!',
                           data: updatedWork
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

//fetach all the work for site-----------------
const getAllWork = async (req, res, next) => {
    console.log("get list of all work by customer id ........")
    let siteId = req.params.siteId
    try{
    
   
    
     let workList =await Work.find({site_id:siteId})
  
    
     
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the list of sites",
        total: workList.length,
        data: workList
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

      //  Delete work by work Id
      const deleteWork =async (req, res, next)=>{
        console.log("delete work by work id is running.....")
        let workId = req.params.workId;
    
        let checkWorkExist = await Work.findOne({work_id:workId})
       
      
      if(!checkWorkExist){
          res.status(400).json({
              status: "failed",
              message : `work with id (${workId}) is not exist!!`
          }) 
      }
      else{
        
        await Work.findByIdAndRemove(checkWorkExist._id)
        .then(()=>{
            res.status(200).json({
                status: "success",
                message: 'Work deleted successfully!',
                workId: workId
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
        createWork, getWorkById, updateWork, getAllWork, deleteWork
    }