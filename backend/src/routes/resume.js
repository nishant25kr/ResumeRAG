import { Router } from "express";
import { getallResume, getResume, openResume, uploadResume, getStats } from "../controllers/resume.js";
import upload from "../middlewares/upload.js";

const router = Router()

router.route("/upload").post(upload.single("pdf"),uploadResume)
router.route("/get-resume").post(getResume)
router.route("/getallresume").get(getallResume)
router.route("/pdf/:id").get(openResume)
router.route("/stats").get(getStats)


export default router