import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.middleware.js';
import { getUser } from '../controllers/user.controller.js';

const router = Router();

router.get("/",verifyToken,getUser)

export default router;