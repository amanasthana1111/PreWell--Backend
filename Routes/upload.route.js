import express from "express";
import uploadResumes from "../controllers/userResumes.controller.js";
import generatePortfolioWebsite from "../controllers/portfolioWebsite.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import upload from "../utils/multer.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", UserAuth, upload.single("file"), uploadResumes);
uploadRouter.post("/generate-website", upload.single("file"), generatePortfolioWebsite);

export default uploadRouter;
