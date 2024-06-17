const {Router} = require("express")
const userRouter = Router()
const {registerUser, userLogin}= require("../controllers/userController");

userRouter.post("/register_user", registerUser );
userRouter.post("/login", userLogin )


module.exports = userRouter;