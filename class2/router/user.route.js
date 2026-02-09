import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import { me } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/me').get(authMiddleWare, me);


export default userRouter