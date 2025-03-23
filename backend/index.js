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
import podcastRoutes from "./src/routes/podcast.routes.js"
import connectDB from "./src/db/index.js";
import ffmpeg from "fluent-ffmpeg";

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
    origin: ["http://localhost:3000", "http://localhost:5173", process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Global error handler
app.use((err, req, res, next) => {
  // If error has a status, use it, otherwise default to 500
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ error: message });
});

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);


app.use("/api/podcast", podcastRoutes);

//check if ffmpeg is working
app.get('/api/ffmpeg', (req, res) => {
  ffmpeg.getAvailableCodecs(function(err, codecs) {
    if(err){
      return res.status(500).json({error: "ffmpeg not working", details:err.message});
    }

    res.json({ message: 'FFmpeg is working', formats: Object.keys(formats) });
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.log("MongoDB connection failed! ", err);
})

