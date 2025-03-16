import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {giveUserDetails} from "../controllers/user.controller.js";

const router = Router();

router.route("/userdetails").get(verifyUserJWT, giveUserDetails);

export default router;