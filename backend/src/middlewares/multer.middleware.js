import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.error("Error creating uploads directory:", err);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const allowedVideoTypes = [".mp4", ".mkv", ".avi", ".mov", ".flv"];
const allowedImageTypes = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

// File filter function
const fileFilter = (req, file, cb) => {
  // Extract the file extension
  const ext = path.extname(file.originalname).toLowerCase();

  // Check if the file extension is in the list of allowed video formats
  if (allowedVideoTypes.includes(ext) || allowedImageTypes.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only video and image files are allowed."),
      false
    ); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
