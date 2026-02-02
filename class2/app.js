import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import ErrorMiddleWare from './middleware/ErrorMiddleWare.middleware.js';
import userRouter from './router/user.route.js';

dotenv.config();

const app = express();

const isAllowed = [];
const readOnly =['*'];

const corsOptions = {
    origin: (origin, callback)=>{
        if(!origin){
            return callback(null, true);
        }

        if(isAllowed.includes(origin)){
            return callback(null, true);
        }

        else if(readOnly.includes(origin)){
            return callback(null, {
                methods: 'GET'
            })
        }
    }
}

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    legacyHeaders: false,
    standardHeaders: true,
    handler: (req, res)=>{
        return res.status(429).json({
            success: false,
            message: 'Too many requests, please try again later'
        })
    }
})

app.use(limiter)

app.use(express.json());

app.use('/api/v1/users', userRouter)


app.use(ErrorMiddleWare)






export default app;