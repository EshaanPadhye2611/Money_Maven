import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {giveUserDetails} from "../controllers/user.controller.js";
import { insuranceForm, getInsurance } from "../controllers/insurance.controller.js";
import { fdForm, getFD } from "../controllers/fd.controller.js";

const router = Router();

router.route("/userdetails").get(verifyUserJWT, giveUserDetails);

router.route("/insuranceForm").post(verifyUserJWT, insuranceForm);
router.route("/getInsurance").get(verifyUserJWT, getInsurance);
router.route("/fdForm").post(verifyUserJWT, fdForm);
router.route("/getFD").get(verifyUserJWT, getFD);

export default router;