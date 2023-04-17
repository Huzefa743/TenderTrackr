const fse = require('fs-extra');
const path = require('path')
const emailValidator = require('deep-email-validator')


async function moveImage(ActualImageName, NewImageName) {
     fse.moveSync(path.join('./store/temp/'+ActualImageName), path.join('./store/user-details/'+NewImageName+'.png'), '',{ recursive: true }, function (err) {
    
        if (err) {                
          console.error(err);      
        } else {
          console.log("clone success!");
        }
    });

}

 async function isEmailValid(email) {
    return emailValidator.validate(email)
  }

  async function sendMailWithAttachment(email, password){
    console.log("inside email");
    let id = req.query.id;
    try {
      var mail = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587, // secure SMTP
        secure: false,
        auth: {
          user: "huzefakhan284@gmail.com",
          pass: "Envisag743@",
        },
      });
      let data = fs.readFileSync(
        path.join(__dirname, "../store/" + id + "/SOW-Document-"+id+"/.docx")
      );
      var mailOptions = {
        from: 'huzefakhan284@gmail.com',
        to: 'huzefakhan9090@gmail.com',
        subject: "Tesla-ClickUp Temp Password",
        text: 'hello'
        // text: `Hi,
        //          \n Please find the temp password for your Tesla-Clickup.
        //          \n link : https://kraftman-consultants.onrender.com/login
        //          \n
        //          \n
        //          \n\nRegards,
        //          Tesla Transformers (Global) Pvt. Ltd.`
      };
  
      mail.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.send({
            message: "Email sent successfully",
          });
        }
      });
    } catch (error) {
      console.log(" error", error);
      res.send({
        message: "Unable to send mail.",
      });
    }
  };


module.exports ={
   moveImage, isEmailValid
  }