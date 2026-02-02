function ErrorMiddleWare(err,req,res,next){

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        message:message,
        stack : err.stack
    })

}

export default ErrorMiddleWare;