import { Router } from "express";
import { gettingUser,LoginUser,refreshToken,registerUser } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import LoginUserSchema from "../schemas/LoginUser.js";


const authRouter = Router();


authRouter.route('/').get(gettingUser)
authRouter.route('/register').post(validate(registerUserSchema),registerUser);
authRouter.route('/login').post(validate(LoginUserSchema), LoginUser)
authRouter.route('/refresh-token').post(refreshToken)





export default authRouter;