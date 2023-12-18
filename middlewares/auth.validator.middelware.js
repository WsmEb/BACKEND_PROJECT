
const { body }  = require("express-validator");


const authValidator = [
  body("username").notEmpty().withMessage("The Username Field is Required").isLength({min:3,max:20}).withMessage("The Number Of Characters Must be Between 3 and 20"),
  body("email").notEmpty().withMessage("The Email Field is Required").isEmail().withMessage("Pleae Entre A valid Email"),
  body("password").notEmpty().withMessage("The Password Field is Required").isLength({min:8,max:60}).withMessage("The Number Of Characters Must be Between 8 and 36")
]


module.exports = authValidator