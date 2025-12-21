import express from "express";

import UserAuth from "../middleware/UserAuth.js";
import { checkAccess } from "../middleware/freeAccess.js";

const userRouter = express.Router();


// userRouter.get("/c",UserAuth,checkAccess,(req,res)=>{
//     res.send("req done");
// })

export default userRouter;