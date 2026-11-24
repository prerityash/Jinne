import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/database.js';
import invokeGeminiAi from './services/ai.service.js';

dotenv.config({ path: './src/.env' });
dotenv.config();

const port = 3000;

await connectDb() //await is must otherwise syncronous calling

await invokeGeminiAi()

app.listen(port, () => {
    console.log(`We are online on ${port}`)
})