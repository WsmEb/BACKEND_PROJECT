
const mongoose = require("mongoose");
const validator = require("validator")
require("dotenv").config()
const Cases = require("../utils/EnumCases")

mongoose.connect(process.env.MONGODB_LINK);

const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    minlength : 3,
    maxlength : 20
  },
  email : {
    type : String,
    required : true,
    unique : true,
    validator : [validator.isEmail,"Entre A Valid Email"]
  },
  password : {
    type : String,
    required : true,
    minlength : 8,
    maxlength : 60
  },
  role : {
    type : String,
    enum : [Cases.ADMIN,Cases.USER,Cases.MANAGER],
    default : Cases.USER
  },
  avatar : {
    type : String,
    default : "uploads/R.jpg"
  }
  // token : {
  //   type : String
  // }
})

const UserModel =  mongoose.model("USERS",UserSchema)

module.exports = UserModel