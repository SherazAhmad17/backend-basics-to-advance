import { Router } from "express";
import { gettingUser,LoginUser,registerUser } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import LoginUserSchema from "../schemas/LoginUser.js";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import { me } from "../controllers/user.controller.js";

const authRouter = Router();


authRouter.route('/').get(gettingUser)
authRouter.route('/register').post(validate(registerUserSchema),registerUser);
authRouter.route('/login').post(validate(LoginUserSchema), LoginUser)
authRouter.route('/me').get(authMiddleWare, me);





export default authRouter;