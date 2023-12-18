const { GetAllUsers, Register, Login } = require("../controllers/users-controller")
const authValidator = require("../middlewares/auth.validator.middelware")
const verifyToken = require("../middlewares/verifyToken")
const Uploade = require("../middlewares/FileHandling")

const router = require("express").Router()



router.route("/").get(verifyToken,GetAllUsers);
router.route("/register").post(Uploade("avatar"),authValidator,Register)
router.route("/login").post(Login)

module.exports = router