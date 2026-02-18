import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
import loggingMiddleware from "./middleware/loggingMiddleware.js";
import userRouter from "./router/user.route.js";
import productRouter from "./router/product.route.js";
import CustomError from "./handler/CustomError.handler.js";

dotenv.config();

const app = express();

// cors
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    legacyHeaders: false,
    standardHeaders: true,
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many requests, please try again later",
        });
    },
});

app.use(limiter);

// body parsers
app.use(express.json());
app.use(cookieParser());

// logging middleware - logs method, URL, timestamp
app.use(loggingMiddleware);

// routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// handle invalid routes
app.all("{*path}", (req, res, next) => {
    next(new CustomError(404, `Route ${req.originalUrl} not found`));
});

// error handling middleware
app.use(errorMiddleware);

export default app;
