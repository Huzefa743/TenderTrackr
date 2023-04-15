const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const Site = require('../models/site')
const Work = require('../models/work')
const Material = require('../models/material')
const Payment = require('../models/payment')
const { response } = require('express')
const {v4: uuid4} = require('uuid')
const fileName=require('./imageController')
const materialService = require('../service/materialService')



 
 //-----------create material    ---------------------
 const createMaterial = async (req, res, next)=> {
    console.log("create material is running....")

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
                if( req.body.name==null || req.body.qty==null || req.body.price==null || req.body.mop==null)
                {  
                res.status(500).json({
                    status: "failed",
                    message : 'All fields are required(name, qty, price, mop)'
                })   
                }
            else{
                var materialId = "MAT-" + uuid4()
                if(req.file){
                    console.log("yes file exist")
                    var newImageName = Math.floor(Math.random()*9000000) + 10000000+".jpg";
                    
                    await materialService.moveImage('./store/temp/'+fileName.imageName, './store/'+customerId+'/'+materialId+'/'+newImageName)
    
                }
            
               
                let material =new Material({
                    material_id: materialId,
                    name: req.body.name,
                    qty: req.body.qty,
                    price:req.body.price,
                    mop:req.body.mop,
                    receipt: '/'+customerId+'/'+materialId+'/'+newImageName,
                    cust_id: customerId,
                    dealer_name:req.body.dealer_name,
                    site_id: siteId,
                    date: req.body.date,
                    work_id:workId
                })

                material.save()
                .then(async response => {
                    let paymentId = "PY-" + uuid4()
                    let payment =new Payment({
                     payment_id: paymentId,
                     amount:Number(req.body.price).toFixed(2),
                     cust_id: customerId,
                     site_id: siteId,
                     date: req.body.date,
                     action: "Debit",
                     mop: req.body.mop,
                     remark: "Material - "+req.body.name,
                     material_id:materialId,
                     dealer_name:req.body.dealer_name
                    })
                    payment.save()
                    
                    res.status(200).json({
                        status: "success",
                        message : 'Material Added Successfully!',
                        data: material
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

//fetach material by Id ----------------
const getMaterialById = async (req, res, next) => {
    console.log("get material by Id ........")
    let materialId = req.params.materialId
    try{
    
    const materialDetails =await Material.findOne({material_id: materialId})

    if(!materialDetails){
        res.status(400).json({
            status: "failed",
            message : `Material with ref id (${materialId}) not exist!!`
        }) 
      }
      else{
    
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the material details",
        data: materialDetails 
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

//--update by material by material Id ---------------------
const updateMaterial = async (req, res, next)=> {
    console.log("Update material is running....")

    let materialId = req.params.materialId
        console.log("materialId no", materialId)

   
             let checkMaterialExist = await Material.findOne({material_id:materialId})
          
              if(!checkMaterialExist){
               res.status(400).json({
                   message : `Material with ref id (${materialId}) not exist!!`
               }) 
             }
             else{
                    try{
                         if(req.file){
                            var newImageName = Math.floor(Math.random()*9000000) + 10000000+".jpg";
                            if(!checkMaterialExist.receipt.includes("undefined")){
                            await materialService.removeTempImage(checkMaterialExist.receipt)
                            }
                    
                            await materialService.moveImage('./store/temp/'+fileName.imageName, './store/'+checkMaterialExist.cust_id+'/'+checkMaterialExist.material_id+'/'+newImageName)
                            req.body.receipt='/'+checkMaterialExist.cust_id+'/'+checkMaterialExist.material_id+'/'+newImageName
            
                         }
                         

                   await Material.findByIdAndUpdate(checkMaterialExist._id, {$set: req.body})
                   .then(async response => {
                    let updatedMaterial = await Material.findOne({material_id:materialId})
                       res.status(200).json({
                           status: "success",
                           message : 'Material Updated Successfully!',
                           data: updatedMaterial
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

//fetach all the material for work-----------------
const getAllMaterial = async (req, res, next) => {
    console.log("get list of all material by work id ........")
    let workId = req.params.workId
    try{
    
    
     let materialList =await Material.find({work_id:workId})
     
   
    
     
    res.status(200).json({ 
        status: "Success",
        message: "Successfully fetch the list of material",
        total: materialList.length,
        data: materialList
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

      //  Delete material by material Id
      const deleteMaterial =async (req, res, next)=>{
        console.log("delete material by work id is running.....")
        let materialId = req.params.materialId;
    
        let checkMaterialExist = await Material.findOne({material_id:materialId})
       
      
      if(!checkMaterialExist){
          res.status(400).json({
              status: "failed",
              message : `Material with id (${materialId}) is not exist!!`
          }) 
      }
      else{
        
        await Material.findByIdAndRemove(checkMaterialExist._id)
        .then(()=>{
             Payment.findOneAndRemove({"material_id":checkMaterialExist.material_id}).then(
            res.status(200).json({
                status: "success",
                message: 'Material deleted successfully!',
                workId: materialId
            })
             )
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
    
    //---------------- Fetching material receipt Image by material ID and w.r.t. local path----->
const showMaterialImage = async (req, res, next) => {
    console.log("fetch material image image is running.........")
    var materialId = req.params.materialId;
    console.log("collectionId",materialId)

    let checkMaterialExist = await Material.findOne({material_id:materialId})
    console.log(checkMaterialExist)
   try{
    if(!checkMaterialExist){
        res.status(400).json({
            status: "failed",
            message : `Material with id (${materialId}) is not exist!!`
        }) 
    }
    else{
    let materialImagePath = checkMaterialExist.receipt
    console.log(materialImagePath)
    res.sendFile(materialImagePath, { root: './store'})
}
}
catch(error){
    console.log(error)
    res.status(400).json({
        status:"failed",
        error: error,
        message: "an error occur"
    })
}
}


    module.exports={
        createMaterial, getMaterialById, updateMaterial, getAllMaterial, deleteMaterial, showMaterialImage
    }