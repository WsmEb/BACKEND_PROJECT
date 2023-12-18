
const { validationResult} = require("express-validator")
const { GetCoursesModel,AddCourseModel, GetSingleCurseModel, UpdateCourseModel, DeleteCourseModel } = require("../models/Courses-model")

const httpStatusText = require("../utils/httpStatusText")
const asyncHabdler = require("express-async-handler")


const GetAllCourses = asyncHabdler( async (req,res,next) => {

  const query = req.query
  const limit = query.li
  const skip = (query.p -1 ) * limit

  const data = await GetCoursesModel().limit(limit && limit).skip(skip);
  res.json({status : httpStatusText.SUCCESS,data : {courses : data}})
})

const SingleCourse = async (req,res,next) => {

  const courseId = req.params.courseId;

  try {
    const course = await GetSingleCurseModel(courseId)
    if(course)  res.json({status : httpStatusText.SUCCESS,data : {courses : course}})
    else res.json({status : httpStatusText.FAIL,data : {courses : "Course Not Found"}})
  }catch(err) {
    res.json({status : httpStatusText.ERROR,message : "Object Id Invalid",code : 400})
  }


}

const AddCourse = (req,res,next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.json({status : httpStatusText.FAIL,data : {courses : errors.array()}})
  }

  const data = AddCourseModel(req.body)
  res.json({status : httpStatusText.SUCCESS,data : {courses : data}})

}

const UpdateCourse =  async  (req,res,next) => {

  try {
    const body = req.body;
    const courseId = req.params.courseId;
    const updating =  await   UpdateCourseModel(body,courseId);
    if(updating.modifiedCount > 0)  return res.json({status : httpStatusText.SUCCESS,data : {courses : updating}})
    else return res.json({status : httpStatusText.FAIL,data : {courses : "Course Not Found"}})
  } catch(err) {
    return res.json({status : httpStatusText.ERROR,message : "Invalid Object Id",code : 400})
  }
}

const DeleteCourse = async (req,res,next) => {

  try {
    const courseId = req.params.courseId 
    const deletedCourse = await DeleteCourseModel(courseId)
  
    if(deletedCourse.deletedCount > 0) return res.json({status : httpStatusText.SUCCESS,data : {courses : deletedCourse}})
    else return res.json({status : httpStatusText.FAIL,data : {courses : "Course Not Found"}})
  
  }catch(err) {
    return res.json({status : httpStatusText.ERROR,message : "Object Id Invalid",code : 400})
  }
}

module.exports =  {
  GetAllCourses,
  SingleCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse
}