import jwt from 'jsonwebtoken';

function generateToken(user){

    if(!user){
        throw new Error('user is not found');
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"} )
    
    return token
}

export default generateToken;
