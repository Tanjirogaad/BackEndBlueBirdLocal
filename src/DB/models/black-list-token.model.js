import { Schema, model } from "mongoose";

const blackListTokenSchema = new Schema({
    tokenId: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model("BlackListToken", blackListTokenSchema);