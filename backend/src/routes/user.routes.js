import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { getUser } from '../controllers/user.controller.js';
import passport from "passport";
import passportConfig from "../config/passport-config.js";

const router = Router();
passportConfig(passport);
router.get("/",passport.authenticate("jwt", { session: false }),getUser)

export default router;