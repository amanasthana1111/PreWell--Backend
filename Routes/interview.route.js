import express from "express"
import UserAuth from "../middleware/UserAuth.js";
import { interview } from "../controllers/interview.controller.js";
import atsScanner from "../controllers/atsScanner.controller.js";
const interView_Router = express.Router();


interView_Router.post("/interview",UserAuth ,interview )
interView_Router.get("/atsScanner",UserAuth,atsScanner)

export default interView_Router;