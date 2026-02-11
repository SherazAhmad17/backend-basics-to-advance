import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import { changePassword, me } from "../controllers/user.controller.js";
import validate from "../middleware/validate.js";
import changePasswordSchema from "../schemas/changePassword.js";

const userRouter = Router();

userRouter.route('/me').get(authMiddleWare, me);
userRouter.route('/change-password').post(validate(changePasswordSchema), authMiddleWare, changePassword );



export default userRouter