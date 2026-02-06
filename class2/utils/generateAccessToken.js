import jwt from 'jsonwebtoken';

function generateAccessToken(user){

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES} )
    
    return token
}


export default generateAccessToken;
