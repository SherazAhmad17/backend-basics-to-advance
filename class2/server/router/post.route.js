import {Router} from "express";
import validate from "../middleware/validate.js"
import PostSchemaValidation from "../schemas/postSchema.js"
import updatePostSchema from "../schemas/updatePostSchema.js"
import {createPost, postDetails, getAllPosts, getMyPosts, updatePost} from "../controllers/post.controller.js"
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";

const postRouter = Router();


postRouter.route("/create-post").post(validate(PostSchemaValidation), authMiddleWare, createPost)
postRouter.route("/get-post/:id").get(postDetails)
postRouter.route("/all-posts").get(authMiddleWare, getAllPosts)
postRouter.route("/my-posts").get(authMiddleWare, getMyPosts)
postRouter.route("/update-post/:id").put(validate(updatePostSchema), authMiddleWare, updatePost)



export default postRouter