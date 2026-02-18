import CustomError from "../handler/CustomError.handler.js";
import User from "../models/user.model.js";
import AsyncHandler from "../handler/AsyncHandler.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import verificationEmailTemplate from "../emailTemplates/verificationEmail.js";
import emailSend from "../utils/emailSend.js";


// register user
const registerUser = AsyncHandler(async(req,res,next)=>{

    const {name, email, password, phone, address, city, country} = req.body;

    // check for duplicate email
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new CustomError(400, "User with this email already exists"));
    }

    // generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // create user
    const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
        city,
        country,
        verificationToken
    })

    if(!user){
        return next(new CustomError(500, "Something went wrong while creating user"));
    }

    // send verification email
    const verificationLink = `${process.env.APP_URL}/api/users/verify-email?token=${verificationToken}`;
    const emailTemplate = verificationEmailTemplate(user.name, verificationLink);
    await emailSend(user.email, "Verify your email - E-Commerce", emailTemplate);

    res.status(201).json({
        success: true,
        message: "User registered successfully. Please check your email to verify your account.",
    })

})


// verify email
const verifyEmail = AsyncHandler(async(req,res,next)=>{

    const { token } = req.query;

    if(!token){
        return next(new CustomError(400, "Verification token is required"));
    }

    const user = await User.findOne({ verificationToken: token });

    if(!user){
        return next(new CustomError(400, "Invalid or expired verification token"));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `${user.name}, your email has been verified successfully! You can now login.`,
    })

})


// login user
const loginUser = AsyncHandler(async(req,res,next)=>{

    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new CustomError(400, "Invalid credentials"))
    }

    // check if email is verified
    if(!user.isVerified){
        return next(new CustomError(403, "Please verify your email before logging in"))
    }

    const checkPassword = await user.comparePassword(password);

    if(!checkPassword){
        return next(new CustomError(400, "Invalid credentials"))
    }

    const token = generateToken(user);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            country: user.country,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
    })

})


// get profile (protected)
const getProfile = AsyncHandler(async(req,res,next)=>{

    const user = req.user;

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            country: user.country,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        }
    })

})


export { registerUser, verifyEmail, loginUser, getProfile };
