import express from "express";
import  userRegister  from "../controllers/userRegister.controller.js";
import userLogin from "../controllers/userlogin.controller.js";
import userLogout from "../controllers/userlogout.controller.js";
import UserAuth from "../middleware/UserAuth.js";
import isUserAuth from "../controllers/isUserAuth.controller.js";
const router = express.Router();

router.post("/register" ,userRegister);
router.post("/login" ,userLogin);
router.get("/auth",isUserAuth);
router.get("/logout",UserAuth,userLogout);


export default router;