import mongoose, { Schema } from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token needed to be blacklisted"]
    }
},
    {
        timestamps: true
    })

const blacklistedModel = mongoose.model("blacklistTokens", blacklistTokenSchema);

export default blacklistedModel