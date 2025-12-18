import express from "express";
import Profile from "../controllers/userProfile.controller.js";
import editProfile from "../controllers/userEditProfile.controller.js";
import UserAuth from "../middleware/UserAuth.js";
const userRouter = express.Router();

userRouter.get("/me" , UserAuth,  Profile);
userRouter.post("/me" , UserAuth,  editProfile);

export default userRouter;