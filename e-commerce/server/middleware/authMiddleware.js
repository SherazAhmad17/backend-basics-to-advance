import AsyncHandler from "../handler/AsyncHandler.js";
import CustomError from "../handler/CustomError.handler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const authMiddleware = AsyncHandler(async(req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer " , "");

    if(!token){
        return next(new CustomError(401, "unauthorized - no token provided"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    if(!userId){
        return next(new CustomError(401, "unauthorized - invalid token"));
    }

    const user = await User.findById(userId);

    if(!user){
        return next(new CustomError(401, "unauthorized - user not found"));
    }

    req.user = user;
    next();

})

export default authMiddleware
