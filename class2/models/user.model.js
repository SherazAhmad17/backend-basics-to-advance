import mongoose from "mongoose";
import bcrypt from "bcrypt";


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
  },
  role: {
    type:String,
    enum: ["user", "admin", "manager", "superman"],
    default: "user",
  },

  forgetPasswordToken: {
    type: String,
    default: null
  },

  forgetPasswordTokenExpiry: {
    type : Date,
    default:null
  },

  refreshToken: [
    {
      token:{
        type: String,
        createdAt : Date
      }
    }
  ]
}, {timestamps: true} ); // timestamps will add createdAt and updatedAt


//idr ham bycript wla password save karenge
UserSchema.pre("save", async function(){
  if(!this.isModified("password")){
    return;
  }
  try {
    this.password = await bcrypt.hash(this.password, 10); //10 here is salt namak nahe dusra wla

  } catch (error) {
    console.log("faild bycript password")
  }
})

UserSchema.methods.comparePassword = async function(password){
  const checkPassword = await bcrypt.compare(password, this.password);

  return checkPassword
}

// making model

const User = mongoose.model("user", UserSchema);

export default User;
