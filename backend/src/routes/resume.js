import { Router } from "express";
import { getallResume, getResume, openResume, uploadResume } from "../controllers/resume.js";
import upload from "../middlewares/upload.js";

const router = Router()

router.route("/upload").post(upload.single("pdf"),uploadResume)
router.route("/get-resume").post(getResume)
router.route("/getallresume").get(getallResume)
router.route("/pdf/:id").get(openResume)


export default router