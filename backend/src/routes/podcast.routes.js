import { Router } from "express";
import passport from "passport";
import passportConfig from "../config/passport-config.js";
import upload from "../middlewares/multer.middleware.js";
import { createPodcast, uploadEpisode } from "../controllers/podcast.controller.js";

const router = Router();

passportConfig(passport);

router.post(
    "/episode/upload",
    passport.authenticate("jwt", { session: false }),
    upload.single("file"),
    uploadEpisode
);

router.post("/create",passport.authenticate("jwt",{session: false}),upload.single("thumbnail"),createPodcast)

export default router;
