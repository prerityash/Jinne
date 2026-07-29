import express from 'express'
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter); ////registering route & prefix for route > "/api/auth"

export default app;