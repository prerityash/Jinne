import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './config/database.js';

dotenv.config();
const port = 3000;

await connectDb() //await is must otherwise syncronous calling

app.listen(port, () => {
    console.log(`We are online on ${port}`)
})