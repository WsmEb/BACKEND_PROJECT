
const httpStatusText = require("../utils/httpStatusText")
const multer = require("multer");
const manageError = require("../utils/managingError");
const AppError = require("../utils/ErrorClass")
const Uploade = (pathName) => {

  const storage  = multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null,"uploads")
    },
    filename : (req,file,cb) => {
      const ext = file.mimetype.split("/")[1]
      const fileName = `user-${Date.now()}-${file.fieldname}-${file.originalname}`
      cb(null,fileName)
    }
  })
  
  const fileFilter = (req,file,cb) => {
    const patternAllowed = file.mimetype.split("/")[0];
    if(patternAllowed === "image"){
      return cb(null,true)
    } 
    else{
      const error = manageError(httpStatusText.ERROR,"Image Only",409)
      console.log(error);
      return cb(AppError(httpStatusText.ERROR,"Image Only",409),false)
    }
  }
  
  const upload = multer({storage,fileFilter})
  return upload.single(pathName);

}

module.exports = Uploade