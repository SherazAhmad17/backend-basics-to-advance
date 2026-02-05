import mongoose from "mongoose";


//making schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [30, "Name must be at most 30 characters long"],
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password:{
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"],
    select: false
  },
  gender: {
    type: String,
    enum: ["male","female","others"],
    required: [true, "Gender is required"],
  }
}, {timestamps: true} ); // timestamps will add createdAt and updatedAt

// making model

const User = mongoose.model("user", UserSchema);

export default User;
