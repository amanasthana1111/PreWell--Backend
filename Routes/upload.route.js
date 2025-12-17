import express from "express";
import uploadResumes from "../controllers/userResumes.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import upload from "../utils/multer.js";

const uploadrouter = express.Router();

uploadrouter.post("/upload", UserAuth, upload.single("file"), uploadResumes);

export default uploadrouter;
