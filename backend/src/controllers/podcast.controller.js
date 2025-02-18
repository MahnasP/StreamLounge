import { Episode } from "../models/episode.model.js";
import { Podcast } from "../models/podcast.model.js";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { promisify } from "util";
import { User } from "../models/user.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadEpisode = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      const err = new Error("user not authenticated");
      console.log("no userid in req");
      return res.status(401).json(err.message);
    }
    console.log(user._id);
    const { name, desc, mediaType } = req.body;

    const episodeId = uuidv4();
    const file = req.file;
    const Path = `./uploads/videos/${episodeId}`;
    const outputDir = Path;
    const manifestPath = `${Path}/index.m3u8`;
    console.log("video path: ", file.path);
    console.log("before transcoding m3u8 path :", manifestPath);

    if (!fs.existsSync(Path)) {
      fs.mkdirSync(Path, { recursive: true });
    }

    const metadata = await promisify(ffmpeg.ffprobe)(file.path);
    const { height } = metadata.streams[0];
    const isHigherThan480p = height > 480;

    const scaledFilePath = `${Path}/scaled_video.mp4`;

    if (isHigherThan480p) {
      console.log("Video is higher than 480p, resizing...");
      await new Promise((resolve, reject) => {
        ffmpeg(file.path)
          .outputOptions([
            "-vf scale=-2:480", // Maintain aspect ratio, scale height to 480
            "-c:v libx264", // Use H.264 codec
            "-preset fast", // Faster processing
            "-crf 23", // Constant Rate Factor (quality)
          ])
          .output(scaledFilePath)
          .on("end", resolve)
          .on("error", reject)
          .run();
      });
      console.log("Video resized to 480p.");
    } else {
      console.log("Video is 480p or lower, no resizing needed.");
      fs.copyFileSync(file.path, scaledFilePath);
    }

    ffmpeg(scaledFilePath)
      .outputOptions([
        "-c:v libx264",
        "-c:a aac",
        "-f hls",
        "-hls_time 10",
        "-hls_list_size 0",
        `-hls_segment_filename ${outputDir}/segment_%03d.ts`,
        "-threads 2",
      ])
      .output(manifestPath)
      .on("end", async () => {
        try {
          // console.log("ffmpeg processing completed and segmentation done");
          // Upload segments
          const segmentFiles = fs
            .readdirSync(outputDir)
            .filter((f) => f.endsWith(".ts"));
          const segmentUrls = await Promise.all(
            segmentFiles.map(async (segment) => {
              const uploadResponse = await cloudinary.uploader.upload(
                `${outputDir}/${segment}`,
                { resource_type: "video" }
              );
              return uploadResponse.secure_url;
            })
          );

          // Update and upload manifest
          let manifestContent = fs.readFileSync(manifestPath, "utf-8");
          segmentFiles.forEach((segment, index) => {
            manifestContent = manifestContent.replace(
              segment,
              segmentUrls[index]
            );
          });
          fs.writeFileSync(manifestPath, manifestContent);

          //console.log("segments uploaded to cloudinary and urls updated in manifest file of the episode")

          const manifestUpload = await cloudinary.uploader.upload(
            manifestPath,
            { resource_type: "raw" }
          );
          console.log("manifest file uploaded to cloudinary");

          // Save episode
          const episode = await Episode.create({
            name,
            desc,
            creator: user._id,
            mediaType,
            file: manifestUpload.secure_url,
          });
          // console.log("new episode created: ", episode._id, episode.name);

          // await Podcast.findByIdAndUpdate(podcastId, { $push: { episodes: episode._id } });

          // Cleanup temporary files
          try {
            fs.unlinkSync(file.path); // Original uploaded file
            if (fs.existsSync(scaledFilePath)) fs.unlinkSync(scaledFilePath); // Scaled video
            segmentFiles.forEach((segment) => {
              const segmentPath = `${outputDir}/${segment}`;
              if (fs.existsSync(segmentPath)) fs.unlinkSync(segmentPath);
            });
            if (fs.existsSync(manifestPath)) fs.unlinkSync(manifestPath); // Manifest
            if (fs.existsSync(outputDir)) fs.rmdirSync(outputDir); // Output directory
            console.log("Temporary files cleaned up.");
          } catch (cleanupError) {
            console.error("Error during cleanup:", cleanupError);
          }

          res.status(201).json(episode);
        } catch (error) {
          console.error("Error processing episode:", error);
          res.status(500).send("Error processing episode.");
        }
      })
      .on("error", (error) => {
        console.error("FFmpeg error:", error);
        res.status(500).send("FFmpeg error.");
      })
      .run();
  } catch (error) {
    console.log("upload episode error: ", error);
    res.status(500).json(error);
  }
};

const createPodcast = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      const err = new Error("user not authenticated");
      console.log("no userid in req");
      return res.status(401).json(err.message);
    }
    const { name, desc, category } = req.body;
    const thumbnail = req.file;
    const episodes = JSON.parse(req.body.episodes);
    //console.log(thumbnail)
    const uploadres = await cloudinary.uploader.upload(thumbnail.path, {
      resource_type: "image",
    });
    const thumbnail_url = uploadres.secure_url;

    const podcast = await Podcast.create({
      name,
      desc,
      thumbnail: thumbnail_url,
      creator: user._id,
      category,
      episodes,
    });

    if (podcast) {
      res.status(201).json(podcast.name);
    }
  } catch (error) {
    console.log("Error in createPodcast: ", error.message);
    res.status(500).json(error);
  }
};

const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("creator", "name profilepic")
      .populate("episodes");
    if (podcasts) res.status(201).json(podcasts);
  } catch (error) {
    console.log("Error in getPodcasts: ", error.message);
    res.status(500).json(error);
  }
};

//get podcast decending order of views
const getMostPopular = async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .sort({ views: -1 })
      .populate("creator", "name profilepic")
      .populate("episodes");
    if (podcasts) res.status(201).json(podcasts);
  } catch (error) {
    console.log("Error in getMostPopular: ", error.message);
    res.status(500).json(error);
  }
};


const getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id)
      .populate("creator", "name profilepic")
      .populate("episodes");
    if (podcast) res.status(201).json(podcast);
  } catch (error) {
    console.log("Error in getPodcastById: ", error.message);
    res.status(500).json(error);
  }
};

const addView = async (req, res) => {
  try {
    await Podcast.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({ message: "view added." });
  } catch (error) {
    console.log("Error in addView: ", error.message);
    res.status(500).json(error);
  }
};

const favoritePodcast = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const podcast = await Podcast.findById(req.body.id);
    if (user._id === podcast.creator) {
      return res.status(403).json("Cannot favorite your own podcast");
    }

    const isFavorited = user.favorites.includes(req.body.id);
    const updateOperation = isFavorited
      ? { $pull: { favorites: req.body.id } }
      : { $push: { favorites: req.body.id } };

    await User.findByIdAndUpdate(req.user.id, updateOperation, { new: true });

    res.status(200).json({
      message: isFavorited ? "removed from favorites" : "added to favorites",
    });
  } catch (error) {
    console.log("Error in favoritePodcast: ", error.message);
    res.status(500).json(error);
  }
};

const getByCategory = async (req, res) => {
  try {
    const { q } = req.query;
    const podcasts = await Podcast.find({
      category: { $regex: q, $options: "i" },
    })
      .populate("creator", "name profilepic")
      .populate("episodes");

    res.status(200).json(podcasts);
  } catch (err) {
    console.log("Error in getByCategory: ", err.message);
    res.status(500).json(err);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.q;
    const podcasts = Podcast.find({ name: { $regex: query, $options: "i" } })
      .populate("creator", "name profilepic")
      .limit(30);
    res.status(201).json(podcasts);
  } catch (error) {
    console.log("Error in search: ", error.message);
    res.status(500).json(error);
  }
};

export {
  uploadEpisode,
  createPodcast,
  getPodcasts,
  getPodcastById,
  addView,
  favoritePodcast,
  getByCategory,
  search,
  getMostPopular,
};
