import { Router } from "express";
import { registerUser, verifyEmail, loginUser, getProfile } from "../controllers/user.controller.js";
import validate from "../middleware/validate.js";
import registerSchema from "../schemas/registerSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";


const userRouter = Router();

userRouter.post('/register', validate(registerSchema), registerUser);
userRouter.get('/verify-email', verifyEmail);
userRouter.post('/login', validate(loginSchema), loginUser);
userRouter.get('/profile', authMiddleware, getProfile);


export default userRouter;
