
const { validationResult } = require("express-validator");
const UserModel = require("../models/users-model");
const UsersModel = require("../models/users-model")
const bcrypt = require("bcrypt")
const httpStatusText = require("../utils/httpStatusText")
const jwtUtils = require("../utils/JWTfunction");
const verifyRole = require("../utils/mangeRole")



const GetAllUsers = async (req,res,next) => {
  const users = await UsersModel.find({},{"email" : 1,"username" : 1,"_id" : false,"avatar" : true})
  console.log(req.currentUser)
  res.json({status:httpStatusText.SUCCESS,data : {users}})
};

const Register = async (req,res,next) => {
  const {username,email,password,role} = req.body;
  console.log(req.body);
  const errors = validationResult(req);

  if(errors.isEmpty()){

    // bcrypt : 
    const hashPassword = await bcrypt.hash(password,10);
    
  const findEmail = await UserModel.findOne({email : email})
  const verifiedRole = verifyRole(role)
  if(!findEmail) {
    
    const NewUser = await UserModel({ username,email,password : hashPassword,verifiedRole,avatar : req.file.filename})
    NewUser.save()
    // const token = await jwtUtils({email : NewUser.email,id : NewUser._id})
    // NewUser.token = token
    
    return res.json({status:httpStatusText.SUCCESS,data : {users : "Register Succefuly"}})
  }else {
    return res.json({status:httpStatusText.FAIL,data : {users : "Email Already Exist"}})
  }

  }

  else {
    const errorMapping = await errors.array().map(({msg,path}) => { return {msg,filed : path} })
     res.json({status:httpStatusText.FAIL,data : {users : errorMapping}})
  }
};

const Login = async (req,res,next) => {
  const {username,email,password} = req.body;
  const emailChecker = await UserModel.findOne({email : email});
  if(emailChecker) {

    const disHashing = await bcrypt.compare(password,emailChecker.password)
    const findUsername = await UserModel.findOne({username:username});
    if(disHashing && findUsername)
    {
       const token = await jwtUtils({email : emailChecker.email,id : emailChecker._id,role : emailChecker.role})
       return res.json({status:httpStatusText.SUCCESS,data : {users : `Login Succefuly`,token}})}
    else{
        return res.json({status:httpStatusText.FAIL,data : {users : "Incorrect Informations "}})
    }

  }else{
    return res.json({status:httpStatusText.FAIL,data : {users : "User Not Found"}})
  }
};


module.exports = {
  GetAllUsers,
  Register,
  Login
}