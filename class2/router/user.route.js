import { Router } from "express";
import { gettingUser,registerUser } from "../controllers/user.controller.js";
import validate from "../middleware/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";

const userRouter = Router();


userRouter.route('/').get(gettingUser)
userRouter.route('/register').post(validate(registerUserSchema),registerUser);



export default userRouter;