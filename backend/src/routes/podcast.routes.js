import { Router } from "express";
import passport from "passport";
import passportConfig from "../config/passport-config.js";
import upload from "../middlewares/multer.middleware.js";
import { uploadEpisode } from "../controllers/podcast.controller.js";

const router = Router();

passportConfig(passport);

router.post(
    "/episode/upload",
    passport.authenticate("jwt", { session: false }),
    upload.single("file"),
    uploadEpisode
);

export default router;
