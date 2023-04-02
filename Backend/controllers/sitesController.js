const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Site = require('../models/site')
const Work = require('../models/work')
const { response } = require('express')
const {v4: uuid4} = require('uuid')



 
 //-----------create customer site   ---------------------
 const createSite = async (req, res, next)=> {
    console.log("create customer site is running....")

    let customerId = req.params.custId
    let checkCustomerExist = await Customer.findOne({cust_id:customerId})
          
    if(!checkCustomerExist){
     res.status(400).json({
         message : `Customer with Id (${customerId}) not exist!!`
     }) 
   }
   else{
            if( req.body.name==null || req.body.address==null)
                {  
                res.status(500).json({
                    status: "failed",
                    message : 'All fields are required(name, location)'
                })   
                }
            else{
            let checkSiteExist = await Customer.findOne({name:req.body.name})

            if(checkSiteExist){
            res.status(400).json({
                message : `Customer with site name : (${req.body.name}) already exist!!`
            }) 
            }
            else{
                let siteId = "SITE-" + uuid4()
                let site =new Site({
                    site_id: siteId,
                    name: req.body.name,
                    address: req.body.address,
                    cust_id: customerId
                })

                site.save()
                .then(async response => {
                    
                    res.status(200).json({
                        status: "success",
                        message : 'Site Added Successfully!',
                        data: site
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

//fetach site by Id ----------------
const getSiteById = async (req, res, next) => {
    console.log("get site by Id ........")
    let siteId = req.params.siteId
    try{
    
    const siteDetails =await Site.findOne({site_id: siteId})

    if(!siteDetails){
        res.status(400).json({
            status: "failed",
            message : `Site with ref id (${siteId}) not exist!!`
        }) 
      }
      else{
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the site details",
        data: siteDetails 
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

//--update by site Id ---------------------
const updateSite = async (req, res, next)=> {
    console.log("Update site is running....")

    let siteId = req.params.siteId
        console.log("ref no", siteId)

   
             let checkSiteExist = await Site.findOne({site_id:siteId})
          
              if(!checkSiteExist){
               res.status(400).json({
                   message : `Side with ref id (${siteId}) not exist!!`
               }) 
             }
             else{
                    try{
                   await Site.findByIdAndUpdate(checkSiteExist._id, {$set: req.body})
                   .then(async response => {
                    let updatedSite = await Site.findOne({site_id:siteId})
                       res.status(200).json({
                           status: "success",
                           message : 'Site Updated Successfully!',
                           data: updateSite
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

//fetach all the sites for customer-----------------
const getAllSite = async (req, res, next) => {
    console.log("get list of all sites by customer id ........")
    let customerId = req.params.custId
    try{
    
   
    
    
     let siteList =await Site.find({cust_id:customerId})

     for(let i=0; i<siteList.length; i++){
        let workList = await Work.find({site_id:siteList[i].site_id})
       
        siteList[i].work=workList
     }
  
    
     
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the list of sites",
        total: siteList.length,
        data: siteList
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

      //  Delete site by site Id
      const deleteSite =async (req, res, next)=>{
        console.log("delete site by site id is running.....")
        let siteId = req.params.siteId;
    
        let checkSiteExist = await Site.findOne({site_id:siteId})
       
      
      if(!checkSiteExist){
          res.status(400).json({
              status: "failed",
              message : `Site with id (${siteId}) is not exist!!`
          }) 
      }
      else{
        
        await Site.findByIdAndRemove(checkSiteExist._id)
        .then(()=>{
            res.status(200).json({
                status: "success",
                message: 'Site deleted successfully!',
                userId: siteId
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
        createSite, getSiteById, updateSite, getAllSite, deleteSite
    }