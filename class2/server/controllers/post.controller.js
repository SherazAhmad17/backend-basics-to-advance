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

const postDetails = AsyncHandler(async(req,res,next)=>{
        const postId = req.params.id;

        console.log(postId)

        const post = await Post.findById(postId).populate("user", "name email gender");

        if(!post){
            return next(new CustomError(404, "post not found"))
        }

        console.log(post)

        res.status(200).json({
            success:true,
            message:"post found successfully",
            post
        })
})

export {createPost,postDetails}