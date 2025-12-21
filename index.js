import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./DB/dbConnection.js";
import cookieParser from "cookie-parser";
import registerRoutes from "./Routes/auth.routes.js";

import uploadRouter from "./Routes/upload.route.js";
import userRouter from "./Routes/user.route.js";
import redisClient  from "./DB/redisConnection.js";
import rateLimit from "./middleware/ratelimted.js";
import interView_Router from "./Routes/interview.route.js";


const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(rateLimit)
app.use("/api", registerRoutes);
app.use("/resumes", uploadRouter);
app.use("/start",interView_Router)
app.use("/user",userRouter)



const main = async () => {
  try {
    await connectDb();
    await redisClient.connect();
    app.listen(process.env.PORT, () => {
      console.log("Server Started");
    });
  } catch (error) {
    console.log("Faild " + error);
  }
};

main();
