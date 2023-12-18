const httpStatusText = require("../utils/httpStatusText")
const OnlyFor = (...roles) => {

  return (req,res,next) => {
    if(!roles.includes(req.currentUser.role)) {
      return res.json({status : httpStatusText.ERROR,code : 400,message : "Unothorized"})
    }
    next()
  }
}

module.exports = OnlyFor