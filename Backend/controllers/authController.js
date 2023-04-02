const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')
const emailValidator = require('deep-email-validator');
const newId = uuidv4()
const ImageController = require('../controllers/imageController')
const userService = require('../service/userService')

const register = async function (req, res) {

  console.log("Register is running......", ImageController.imageName)

  try{

  if(req.file!=undefined){
    if( req.body.firstName==null || req.body.lastName==null || req.body.emailId==null || req.body.password==null || req.body.userType==null || req.body.nickName==null || req.body.designation==null || req.body.mobileNumber==null || req.file.fieldname!="userAvatar"){  
        res.status(500).json({
            status: "failed",
            message : 'All fields are required(firstName, lastName, emailId, password, userType, userAvatar, nickName, designation, mobileNumber)'
        })   
      }
      else{
       // let emailValidationStatus = await userService.isEmailValid(req.body.emailId)
      //  if(emailValidationStatus.valid){
          let userId = "UID" + uuidv4()
          let newUser = new User({
            user_id: userId,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email_id: req.body.emailId,
            user_type: req.body.userType,
            user_avatar: userId+'.png',
            password: req.body.password,
            nick_name: req.body.nickName,
            designation: req.body.designation,
            mobile_number: req.body.mobileNumber
        
          });
          newUser.password = bcrypt.hashSync(req.body.password, 10);
          
          newUser.save(async function (err, user) {
            if (err) {
              return res.status(400).send({
                status: "Failed",
                message: "Failed to register" + err
        
              });
            } else {
              await userService.moveImage(ImageController.imageName, userId)
              user.password = undefined;
              console.log(user)
  
              return res.status(200).json({
                status: "Success",
                message: "Successfully registered user",
                data: user
              });
            }
          });
      //  }
        // else{
        //   res.status(500).json({
        //     status: "Failed",
        //     message : 'Provided email is not exist!!'
        // })  
        // }
       
      };
      }
    else{
      res.status(500).json({
        status: "failed",
        message : 'All fields are required(firstName, lastName, emailId, password, userType, userAvatar)'
    })   
    }
  
}
catch(error){
  res.status(500).json({
    status:"Failed",
    message: "Failed",
    details:error
  })
}
}


 
const sign_in =async function (req, res) {
  console.log("user login is running........")
  User.findOne({
    email_id: req.body.emailId
  }, 
  function (err, user) {
    console.log(user)
    if (err) {
      return res.status(400).send({
        status: "Failed",
        message: err
      });
    }
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ status: 'Failed',message: 'Authentication failed. Invalid user or password.' });
    }
    console.log("user detials ", user)
    return res.status(200).json({ status: 'Success', userId: user.user_id, userType:user.user_type, userName:user.first_name+" "+user.last_name,  emailId: user.email_id, token: jwt.sign({ email_id: user.email_id, user_name: user.user_name, userName: user.first_name }, 'RESTFULAPIs') });
  });
};

//  Delete collection by collection Id
const resetPassword =async function(req, res, next){
  console.log("reset password is runnin...")
 
  try{
  let userDetails =jwt.decode(req.headers.authorization.split(' ')[1])
  
  console.log("user details is : ", userDetails)

 
  User.findOne({
    email_id: userDetails.email_id
  }, 
  function (err, user) {
    console.log("here is the user data",user)
  //  console.log(user.comparePassword(req.body.currentPassword))
    if (err) {
      return res.status(400).send({
        status: "Failed",
        message: err
      });
    }
    if (user.comparePassword(req.body.currentPassword)) {
      console.log("password mathed")
      let myquery = { email_id: userDetails.email_id  };
      let newPassword = bcrypt.hashSync(req.body.newPassword, 10);
      let newvalues = { $set: {password: newPassword} };
      User.updateOne(myquery, newvalues).then(async()=>{
            res.status(200).json({
                status: "Success",
                message:'Password updated successfully!'
            })
        })
    }
    else{
      console.log("not matched")
      res.status(402).json({
        status: "Failed",
        message:'Invalid current password'
    })
    }
  })



  }
  catch(error){
    res.status(400).json({
        status: "Failed",
        message:'An error Occured!',
        error: error
    })
}
  

}

//---------------- Fetching user avatar details----->
const getUseravatarImage = async (req, res, next) => {
  console.log("fetch user avatar image is running.........")
  var useravatarImagePath = req.params.id;

 try{
 
  res.sendFile('/user-details/'+useravatarImagePath, { root: './store'})

}
catch(error){
  console.log(error)
  res.status(400).json({
      status:"Failed",
      error: error,
      message: "an error occur"
  })
}
}

//rough controllers
const signup = async function (req, res) {

  //console.log("Register is running......", ImageController.imageName)

  try{

    if( req.body.emailId==null || req.body.contactNo==null || req.body.name==null || req.body.password==null){  
        res.status(500).json({
            status: "failed",
            message : 'All fields are required(emailId, contactNo, name, password)'
        })   
      }
      else{
     //   let emailValidationStatus = await userService.isEmailValid(req.body.emailId)

          let userId = "UID" + Math.floor(Math.random() * 10000)
          let newUser = new User({
            user_id: userId,
            first_name: req.body.name,
            email_id: req.body.emailId,
            user_type: req.body.contactNo,
            password: req.body.password,
        
          });
          newUser.password = bcrypt.hashSync(req.body.password, 10);
          
          newUser.save(async function (err, user) {
            if (err) {
              return res.status(400).send({
                status: "Failed",
                message: "Failed to register" + err
        
              });
            } else {
            //  await userService.moveImage(ImageController.imageName, userId)
              user.password = undefined;
              console.log(user)
  
              return res.status(200).json({
                status: "Success",
                message: "Successfully registered user",
                data: user
              });
            }
          });
        }
       
       
   
      
  
  
}
catch(error){
  res.status(500).json({
    status:"Failed",
    message: "Failed",
    details:error
  })
}
}


 
const login =async function (req, res) {
  console.log("user login is running........")
  User.findOne({
    email_id: req.body.emailId
  }, 
  function (err, user) {
    console.log(user)
    if (err) {
      return res.status(400).send({
        status: "Failed",
        message: err
      });
    }
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ status: 'Failed',message: 'Authentication failed. Invalid user or password.' });
    }
    console.log("user detials ", user)
    return res.status(200).json({ message: 'Login Successful', userId: user.user_id,  userName: user.email_id, id: jwt.sign({ email_id: user.email_id, user_name: user.user_name, user_id: user.user_id }, 'RESTFULAPIs') });
  });
};


    //  Delete user by user Id
    const deleteUser =async (req, res, next)=>{
      console.log("delete user  product is running.....")
      let userId = req.params.userId;
  
      let checkUserExist = await User.findOne({user_id:userId})
     
    
    if(!checkUserExist){
        res.status(400).json({
            status: "failed",
            message : `User with id (${userId}) is not exist!!`
        }) 
    }
    else{
      
      await User.findByIdAndRemove(checkUserExist._id)
      .then(()=>{
          res.status(200).json({
              status: "success",
              message: 'User deleted successfully!',
              userId: userId
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

  //fetach user by Id ----------------
const getUserById = async (req, res, next) => {
  console.log("get user by Id ........")
  let userId = req.params.userId
  
  
  let userDetails =await User.findOne({userId: userId})

  if(!userDetails){
      res.status(400).json({
          status: "failed",
          message : `User with id (${userId}) is not exist!!`
      }) 
  }
  else{
      try{
  


 
  res.status(200).json({ 
      status: "Success",
      message: "Successfully fetch the user detail",
      data: userDetails
      });
  
  }
 catch(error){
     console.log(error);
     res.status(500).json({
         status: "Failed",
         message: "an error occured",
         error:error
     });
 
};
  }
}

//fetach all the user-----------------
const getAllUser = async (req, res, next) => {
  console.log("get list of all user ........")
  try{
  
 
  const {page =1 , limit =5} =req.query;
  
   let userList =await User.find().limit(limit*1).skip((page -1) * limit);
   
   let totalInDb =await User.find()

  
   
  res.status(200).json({ 
      status: "Success",
      message: "Successfully fetch the list of user",
      totalInDb:totalInDb.length,
      total: userList.length,
      data: userList
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



module.exports={
  getUseravatarImage, sign_in, resetPassword, register, signup, login, getUserById, deleteUser, getAllUser
}



