const httpStatusText = require("../utils/httpStatusText")
const jwt = require("jsonwebtoken")
const verifyToken = (req,res,next) => {
  
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) res.json({status : httpStatusText.ERROR,message : "Token is Required",code : 405})
    const token = authHeader.split(" ")[1];
  try{
    const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next()
  }catch(err) {
    return res.json({status:httpStatusText.ERROR,message : err.message,code : 401})
  }
}

module.exports = verifyToken;