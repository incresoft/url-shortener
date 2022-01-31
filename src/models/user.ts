import mongoose, { Schema, model, Document } from "mongoose";

const User = new Schema({
    _id: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    discord: {
        type: String,
        default: null
    },
    premium: {
        type: Boolean,
        default: false
    },
    badges: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.models.users || model("users", User);