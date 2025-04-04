import { Router } from "express";
import {
  googleSignin,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import passport from "passport";
import passportConfig from "../config/passport-config.js";

const router = Router();

passportConfig(passport);

router.post("/signup", signup);
router.post("/signin", signin);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  googleSignin
);

export default router;
