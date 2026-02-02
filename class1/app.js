import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import userRouter from './router/user.router.js';

dotenv.config();

const app = express();

//setup cors

const isAllowedOrigin = []

const corsOptions = {
    origin: function(origin,callback){
        if(!origin){
            return callback(null,true);
        }

        if(isAllowedOrigin.includes(origin)){
            return callback(null,true);
        }
        callback(new Error('Not allowed by CORS'));
    }
}

app.use(cors(corsOptions))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit:20,
    legacyHeaders:false,
    standardHeaders:true,
    handler:(req,res)=>{
        res.status(429).json({message:'Too many requests, please try again later.'})
    }
})

app.use(limiter);


app.use('/api/v1/users', userRouter);


export default app;