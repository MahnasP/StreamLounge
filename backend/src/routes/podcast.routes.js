import { Router } from "express";
import passport from "passport";
import passportConfig from "../config/passport-config.js";
import upload from "../middlewares/multer.middleware.js";
import {
  addView,
  createPodcast,
  favoritePodcast,
  getByCategory,
  getPodcastById,
  getPodcasts,
  search,
  uploadEpisode,
} from "../controllers/podcast.controller.js";

const router = Router();

passportConfig(passport);

router.post(
  "/episode/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  uploadEpisode
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("thumbnail"),
  createPodcast
);

router.get("/all", getPodcasts);
router.get("/get/:id", getPodcastById);
router.get("/category", getByCategory);
router.get("/search", search);

router.post("/addview/:id", addView);
router.post(
  "/favorite",
  passport.authenticate("jwt", { session: false }),
  favoritePodcast
);

export default router;
