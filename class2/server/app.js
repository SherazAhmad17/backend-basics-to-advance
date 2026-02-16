import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import ErrorMiddleWare from './middleware/ErrorMiddleWare.middleware.js';
// import userRouter from './router/user.route.js';
import authRouter from './router/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './router/user.route.js';
import adminRoute from './router/admin.route.js';

dotenv.config();

const app = express();

const isAllowed = [];
const readOnly =['*'];

const corsOptions = {
    origin: (origin, callback)=>{
        if(!origin){
            return callback(null, {origin: true, credentials: true , allowedHeaders: ['Content-Type', 'Authorization']});
        }

        if(isAllowed.includes(origin)){
            return callback(null, true);
        }

        else if(readOnly.includes(origin)){
            return callback(null, {
                methods: 'GET',
                credentials: true,
                allowedHeaders: ['Content-Type', 'Authorization']
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
app.use(cookieParser());

// app.use('/api/v1/users', userRouter)

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/users" , userRouter)


app.use(ErrorMiddleWare)






export default app;