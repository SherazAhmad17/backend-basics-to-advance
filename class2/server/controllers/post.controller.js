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

        const post = await Post.findById(postId).populate("user", "name email gender");

        if(!post){
            return next(new CustomError(404, "post not found"))
        }

        res.status(200).json({
            success:true,
            message:"post found successfully",
            post
        })
})

const getAllPosts = AsyncHandler(async(req,res,next)=>{
    const posts = await Post.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success:true,
        message:"posts fetched successfully",
        posts
    })
})

const getMyPosts = AsyncHandler(async(req,res,next)=>{
    const userId = req.user._id;

    const posts = await Post.find({ user: userId })
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success:true,
        message:"your posts fetched successfully",
        posts
    })
})

const updatePost = AsyncHandler(async(req,res,next)=>{
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if(!post){
        return next(new CustomError(404, "post not found"))
    }

    // Check if the logged-in user is the owner of the post
    if(post.user.toString() !== userId.toString()){
        return next(new CustomError(403, "you are not authorized to update this post"))
    }

    const {title, description} = req.body;

    post.title = title;
    post.description = description;
    await post.save();

    res.status(200).json({
        success:true,
        message:"post updated successfully",
        post
    })
})

export {createPost, postDetails, getAllPosts, getMyPosts, updatePost}