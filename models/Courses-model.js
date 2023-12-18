
const { courseModel } = require("./Connections")


const GetCoursesModel = () => {

  return courseModel.find({},{"__v" : false}).sort({title : 1})
}

const GetSingleCurseModel = (courseId) => {

  return courseModel.findById({_id :courseId},{"__v" : false})
}

const AddCourseModel = (body) => {

  const insertCourse = new courseModel(body)
  insertCourse.save()
  return insertCourse;
}

const UpdateCourseModel =  (body,courseId) => {

  const UpdateCourse =  courseModel.updateOne({_id : courseId},{$set : { ...body }})
  return UpdateCourse;
}

const DeleteCourseModel = (courseId) => {

  const deletedCourse = courseModel.deleteOne({_id : courseId});
  return deletedCourse;
}


module.exports = {
  GetCoursesModel,
  AddCourseModel,
  GetSingleCurseModel,
  UpdateCourseModel,
  DeleteCourseModel
}