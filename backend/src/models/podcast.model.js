import mongoose, { Mongoose, Schema } from "mongoose";

const podcastSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    mediaType: {
        type: String,
        default: "video",
    },
    category: {
        type: String,
        default: "podcast",
    },
    views: {
        type: Number,
        default: 0,
    },
    episodes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Episode",
        default: [],
    }

}, { timestamps: true });

export const Podcast = mongoose.model("Podcast", podcastSchema);