import express from "express"
import UserAuth from "../middleware/UserAuth.js";
import { interview } from "../controllers/interview.controller.js";
const interView_Router = express.Router();


interView_Router.post("/interview",UserAuth ,interview )

export default interView_Router;