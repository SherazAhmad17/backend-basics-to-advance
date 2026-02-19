import {Router} from "express";
import validate from "../middleware/validate.js"
import PostSchemaValidation from "../schemas/postSchema.js"
import {createPost, postDetails} from "../controllers/post.controller.js"
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";

const postRouter = Router();


postRouter.route("/create-post").post(validate(PostSchemaValidation),authMiddleWare , createPost)
postRouter.route("/get-post/:id").get(postDetails)



export default postRouter