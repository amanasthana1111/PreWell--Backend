import express from "express";
import uploadResumes from "../controllers/userResumes.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import upload from "../utils/multer.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", UserAuth, upload.single("file"), uploadResumes);

export default uploadRouter;
