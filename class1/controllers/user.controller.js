// cerating a controller for user

const getUser = (req,res,next)=>{
    res.json({
        message:'User fetched successfully'
    })
}



export {getUser};