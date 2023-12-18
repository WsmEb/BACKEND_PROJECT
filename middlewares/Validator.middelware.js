const { body} = require("express-validator")

const ValidatorArray  = [
  body('title').notEmpty().withMessage(`The title is Required`).isLength({min : 3,max:40}).withMessage("The Length must be between 3 and 40 chars").isString().withMessage("The Value Must Be Only String"),
    body('price').notEmpty().withMessage("The Price is Required").isNumeric().withMessage("The Value Must Be A Number Only").isInt("Must Be Int")
]

module.exports = ValidatorArray;