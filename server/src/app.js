import express from 'express'
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());  //always written before anything   

app.use(cookieParser());

app.use("/api/auth", authRouter); //registering route & prefix for route > "/api/auth"

export default app;