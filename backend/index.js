import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { exec } from "child_process";
import upload from "./src/middlewares/multer.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import connectDB from "./src/db/index.js";

dotenv.config({
  path: "./.env",
});

const __dirname = path.resolve();

const port = process.env.PORT||3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  },
  express.static("uploads")
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

// Error handling middleware
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     // Multer error occurred when uploading
//     res.status(400).send(err.message);
//   } else if (err) {
//     // Unknown error occurred
//     res.status(400).send(err.message);
//   }
// });

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);



app.post("/upload", upload.single("file"), (req, res) => {
  console.log("file uploaded");
  const episodeId = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/videos/${episodeId}`;
  const hlspath = `${outputPath}/index.m3u8`;
  console.log("video path: ", videoPath);
  console.log(hlspath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlspath}`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log("exac error: ", error);
      return;
    }
    console.log("stdout: ", stdout);
    console.log("stderr: ", stderr);

    // Delete the original video file after processing
    // fs.unlink(videoPath, (err) => {
    //     if (err) {
    //         console.error("Error deleting file: ", err);
    //         return res.status(500).json({ message: "Error deleting original video file" });
    //     }
    //     console.log("Original video file deleted");
    // });

    const videoUrl = `http://localhost:3000/uploads/videos/${episodeId}/index.m3u8`;
    res.json({
      message: "Video converted to HLS",
      videoUrl: videoUrl,
      episodeId: episodeId,
    });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello there!" });
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.log("MongoDB connection failed! ", err);
})

