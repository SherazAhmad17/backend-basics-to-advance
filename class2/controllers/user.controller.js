import { success } from "zod";
import AsyncHandler from "../handler/AsyncHandler.js";
import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";

const me = AsyncHandler(async(req,res,next)=>{
    const user = req.user;

    res.status(200).json({
        success: true,
        message: "user fetched successfullys",
        user
    })
})


const changePassword = AsyncHandler(async(req,res,next)=>{

    const user = req.user; // here we  are getting user from auth middleware

    const {oldPassword , newPassword} = req.body; // getting old-password and new-password from the body

    const isPasswordCorrect = await user.comparePassword(oldPassword)

    if(!isPasswordCorrect){
        return next(new CustomError(400, "the password is incorrect")); // if password is incorrect
    }

    if(newPassword === oldPassword){
        return next(new CustomError(400, "new password and old password are same")); // if new password and old password are same
    }

    user.password = newPassword; // updating password
    await user.save()   // saving the user in db

    res.status(200).json({
        success: true,
        message: "password changed successfully"   // sending success message
    })




})


export {me , changePassword}