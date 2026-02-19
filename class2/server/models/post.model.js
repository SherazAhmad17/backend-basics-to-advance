import mongoose from "mongoose";

// making the schema

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }
},{timestamps: true})


const Post = mongoose.model("Post", PostSchema)

export {Post};