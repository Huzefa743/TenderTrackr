const fse = require('fs-extra');


async function moveImage(from, to) {
    await fse.moveSync(from, to, '',{ recursive: true }, function (err) {
    
        if (err) {                
          console.error(err);      
        } else {
          console.log("clone success!");
        }
    });

}

async function removeTempImage(imageName){
    await fse.removeSync(imageName,{ recursive: true }, function (err) {
    
        if (err) {                
          console.error(err);      
        } else {
          console.log("clone success!");
        }
    });
    
}

module.exports ={
    moveImage, removeTempImage
  }