
const express = require("express")
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken")
const ValidatorArray  = require("../middlewares/Validator.middelware");
const OnlyFor = require("../middlewares/OnlyFor");
const Cases = require("../utils/EnumCases")

const {GetAllCourses,SingleCourse,UpdateCourse,AddCourse, DeleteCourse} =  require("../controllers/courses.controller")


router.route("/").get(verifyToken,GetAllCourses).post(verifyToken,ValidatorArray,AddCourse)
router.route("/:courseId").get(verifyToken,SingleCourse).patch(verifyToken,UpdateCourse).delete(verifyToken,OnlyFor(Cases.ADMIN,Cases.MANAGER),DeleteCourse)


module.exports = router;
