const multer = require('multer')
const CurrentTime = new Date().getTime()
var fileName=""
var storage = multer.diskStorage({
   
    destination: (req, file, cb) => {
        console.log("multer is running.........")
        cb(null, './store/temp');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
        
        fileName = originalname;

        originalFileName = CurrentTime + "-" + originalname;
       imageLoader()
    }
});

function imageLoader(){
    console.log(fileName+"File name")
   exports.imageName=fileName
}

exports.uploadImage = multer({ storage: storage });

