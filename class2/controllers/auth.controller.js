import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";
import AsyncHandler from "../handler/AsyncHandler.js";
import {generateAccessToken , generateRefreshToken } from "../utils/generateAccessToken.js";
import cookiesOptions from "../utils/cookiesOptions.js";

function gettingUser(req,res,next){
    res.json({
        message: "all users fetched successfully"
    })
}

//register user

const registerUser = AsyncHandler(async(req,res,next)=>{

    // destructuring properties
    let {name, email, password, gender} = req.body;

    // // check all fields are filled
    // if(!name || !email || !password || !gender){
    //     return next(new CustomError(400, "All fields are required"));
    // }

    // //check check gender is valid
    // const validGenders = ['male', 'female', 'others'];
    // if(!validGenders.includes(gender)){
    //     return next(new CustomError(400, "Invalid gender"));
    // }

    // //check for email
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(!emailRegex.test(email)){
    //     return next(new CustomError(400, "Invalid email"));
    // }

    // // check for password length
    // if(password.length < 8){
    //     return next (new CustomError(400, "Password must be at least 8 characters long"));
    // }

    // check for duplicate email
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new CustomError(400, "User already exist"));
    }

    // now finally it passed all the checks now it will go to store in DB

    const user = await User.create({
        name,
        email,
        password,
        gender
    })


    if(!user){
        return next(new CustomError(500, "Something went wrong"));
    }

    res.status(201).json({
        message: 'user is created successfully',
        user: user
    })

    
    })


    // login user

const LoginUser = AsyncHandler(async(req,res,next)=>{

    const {email, password} = req.body; // getting email and password

    const user = await User.findOne({email}).select('+password');  // finding user

    if(!user){
        return next(new CustomError(400, "invalid credentials"))
    }

    const checkPassword = await user.comparePassword(password); // checking password

    if(!checkPassword){
        return next(new CustomError(400, "invalid credentials"))
    }

    const token = generateAccessToken(user); // generating token
    const refreshToken = generateRefreshToken(user); //generating refresh token

    //store in db
    user.refreshToken = [{token: refreshToken, createdAt: Date.now()}]; // storing refresh token
    await user.save({validateBeforeSave: false}) //this will not validate before saving


    res
    .cookie("refreshToken", refreshToken , cookiesOptions) // sending refresh token in cookies
    .status(200)
    .json({
        success: true,
        message: "user logged in successfully",
        "data" : {
            email: user.email,
            id: user._id,
            name: user.name,
            gender: user.gender,
            accessToken: token
        }
    })






})


export {gettingUser , registerUser, LoginUser};