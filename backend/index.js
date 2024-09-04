import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { exec } from "child_process";

dotenv.config({
  path: "./.env",
});

const __dirname = path.resolve();

const port = 3000;
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

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     next();
//   });

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred when uploading
    res.status(400).send(err.message);
  } else if (err) {
    // Unknown error occurred
    res.status(400).send(err.message);
  }
});

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const allowedVideoTypes = [".mp4", ".mkv", ".avi", ".mov", ".flv"];

// File filter function
const fileFilter = (req, file, cb) => {
  // Extract the file extension
  const ext = path.extname(file.originalname).toLowerCase();

  // Check if the file extension is in the list of allowed video formats
  if (allowedVideoTypes.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only video files are allowed."), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
