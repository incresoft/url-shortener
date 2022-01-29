import mongoose, { Schema, model, Document } from "mongoose";

export interface URLInterface extends Document {
    _id: string;
    Redirect: string;
    Code: string;
}

const URL = new Schema({
    _id: String,
    Redirect: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.models.urls || model<URLInterface>("urls", URL);