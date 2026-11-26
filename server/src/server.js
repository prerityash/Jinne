import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/database.js';
import generateInterviewReport from './services/ai.service.js';
import {resume, selfDescription, jobDescription} from './services/temp.js';

dotenv.config({ path: './src/.env' });
dotenv.config();

const port = 3000;

await generateInterviewReport({resume, selfDescription, jobDescription});
await connectDb() //await is must otherwise syncronous calling

app.listen(port, () => {
    console.log(`We are online on ${port}`)
})