import { Router } from "express";
import { gettingUser } from "../controllers/user.controller.js";

const userRouter = Router();


userRouter.route('/').get(gettingUser)



export default userRouter;