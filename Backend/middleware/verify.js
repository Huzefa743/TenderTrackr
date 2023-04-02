const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const verifyUser = async (req, res, next) => {
  // if (!req.headers.authorization) return res.status(400).json({ message: "Invalid Token" }) 
  // let userTokenArray = req.headers.authorization.split(" ");
  // let userToken = userTokenArray[1]
  // let tokenData = jwt.decode(userToken);
  // let user_id = tokenData.id;
  // let userData = await User.findUserById(user_id);

  // if (!userData)
  //     return res.status(400).json({ message: "Invalid Token" })

  // req.user = userData;
  // next();
  if (!req.headers.authorization) 
  { 
     return res.status(400).json({ message: "Token not available" })
  }
  else if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')) {
    console.log("Authorizing user")
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err){
        console.log(err)
         res.status(400).send({
           
          status:"failed",
          message:"Invalid Token !"
        })
      }
      else{
        console.log("Authorized user")
      req.user = decode;
      next();
      }
    });
  
  }

};

module.exports = {
  verifyUser
}
