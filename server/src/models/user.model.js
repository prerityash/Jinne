import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: [true, "Username already taken"]
    },

    email: {
        type: String,
        required: true,
        unique: [true, "email already taken"]
    },

    password: {
        type: String,
        required: true
    }
})

const userModal = moongoose.model('Users', userSchema);

export default userModal;