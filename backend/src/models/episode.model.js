import mongoose, { Schema } from "mongoose";

const episodeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    // thumbnail: {
    //     type: String,
    //     default: "",
    // },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mediaType: {
        type: "String",
        default: "video",
    },
    duration: {
        type: String,
        default: "",
    },
    file: {
        type: String,
        default:"",
    }
}, { timestamps: true })

export const Episode = mongoose.model("Episode", episodeSchema);