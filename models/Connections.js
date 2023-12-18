
const mongoose = require("mongoose");
require("dotenv").config()


mongoose.connect(process.env.MONGODB_LINK);

const CourseScema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  }
})



const courseModel = mongoose.model("NewCourses",CourseScema)


module.exports = {
  courseModel
}