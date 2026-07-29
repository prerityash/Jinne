import mongoose from 'mongoose'

// create Database connection function
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database Connected 👽");
    }
    catch (err) {
        console.log("⛔DB ERROR OCCURED ", err);
    }
}

export default connectDb;