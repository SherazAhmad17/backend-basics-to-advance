import AsyncHandler from "../handler/AsyncHandler.js";

const me = AsyncHandler(async(req,res,next)=>{
    const user = req.user;

    res.status(200).json({
        success: true,
        message: "user fetched successfully",
        user
    })
})


export {me}