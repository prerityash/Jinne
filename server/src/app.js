import express from 'express'
import authRouter from './routes/auth.routes.js';

const app = express();

app.use("/api/auth", authRouter); ////registering route & prefix for route > "/api/auth"
app.use(express.json());

export default app;