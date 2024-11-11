import mongoose, { Schema } from "mongoose";

const userShema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
    },
    profilepic: {
        type: String,
        default: "",
    },
    podcasts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Podcast",
        default: [],
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Podcast",
        default:[],
    }
}, { timestamps: true });

export const User = mongoose.model("User", userShema);