import { Episode } from "../models/episode.model.js";
import { Podcast } from "../models/podcast.model.js";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";

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

    ffmpeg(file.path)
      .outputOptions([
        "-c:v libx264",
        "-c:a aac",
        "-f hls",
        "-hls_time 10",
        "-hls_list_size 0",
        `-hls_segment_filename ${outputDir}/segment_%03d.ts`,
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

export { uploadEpisode };
