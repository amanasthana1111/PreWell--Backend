import express from "express";
import  userRegister  from "../controllers/userRegister.controller.js";
import userLogin from "../controllers/userlogin.controller.js";
import userLogout from "../controllers/userlogout.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import isUserAuth from "../controllers/isUserAuth.controller.js";
import { UserSub } from "../controllers/SubsciptionCheck.controller.js";
const router = express.Router();

router.post("/register" ,userRegister);
router.post("/login" ,userLogin);
router.get("/auth",isUserAuth);
router.get("/logout",UserAuth,userLogout);
router.get("/plan",UserAuth,UserSub);


export default router;