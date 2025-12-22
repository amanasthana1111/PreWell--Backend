import express from "express";

import UserAuth from "../middleware/UserAuth.js";
import { paidUser } from "../controllers/paid.controller.js";

const userRouter = express.Router();


userRouter.post("/buy",UserAuth,paidUser);

export default userRouter;