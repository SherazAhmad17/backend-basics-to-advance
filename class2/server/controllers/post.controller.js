import AsyncHandler from "../handler/AsyncHandler.js";
import { Post } from "../models/post.model.js";
import CustomError from "../handler/CustomError.handler.js";


const createPost = AsyncHandler(async(req,res,next)=>{

    const {title,description} = req.body;

    const user = req.user;

    const post = await Post.create({
        title,
        description,
        user:user._id
    })

    if(!post){
        return next(new CustomError(400, "post not created"))
    }

    res.status(201).json({
        success:true,
        message:"post created successfully",
        user
    })



})

export {createPost}