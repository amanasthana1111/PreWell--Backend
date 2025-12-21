import express from "express"
import UserAuth from "../middleware/UserAuth.js";
import { interview } from "../controllers/interview.controller.js";
import atsScanner from "../controllers/atsScanner.controller.js";
import { checkAccess } from "../middleware/freeAccess.js";
const interView_Router = express.Router();


interView_Router.post("/interview",UserAuth ,checkAccess,interview )
interView_Router.get("/atsScanner",UserAuth,checkAccess,atsScanner)

export default interView_Router;