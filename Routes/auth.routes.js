import express from "express";
import  userRegister  from "../controllers/userRegister.controller.js";
import userLogin from "../controllers/userlogin.controller.js";
import userLogout from "../controllers/userlogout.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import Profile from "../controllers/userProfile.controller.js";
const router = express.Router();

router.post("/register" , userRegister);
router.post("/login" ,userLogin);
router.get("/logout",UserAuth,userLogout);
router.get("/me" , UserAuth,  Profile);

export default router;