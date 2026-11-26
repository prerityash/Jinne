import express from 'express'
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import interviewRouter from './routes/interview.routes.js';


const app = express();
app.use(express.json());  //always written before anything   

app.use(cookieParser());

app.use(cors({      
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter); //registering route & prefix for route > "/api/auth"
app.use("/api/interview", interviewRouter);
export default app;