import {Router} from "express";
import validate from "../middleware/validate.js"
import PostSchema from "../schemas/postSchema.js"
import {createPost} from "../controllers/post.controller.js"
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";

const postRouter = Router();


postRouter.route("/create-post").post(validate(PostSchema),authMiddleWare , createPost)



export default postRouter