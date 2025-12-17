import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./DB/dbConnection.js";
import { User } from "./Models/user.schema.js";
import { UserResume } from "./Models/userResume.schema.js";
import { z } from "zod";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const UserInputValidation = z.object({
      username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(15, "Username must be at most 15 characters"),

      email: z.string().trim().email("Invalid email address"),

      password: z
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(15, "Password must be at most 15 characters"),
    });

    const parsingData = UserInputValidation.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(400).json({
        message: parsed.error.errors[0].message,
      });
    }

    const { username, email, password } = parsingData?.data;

    const hashPassword = await bcrypt.hash(password, 5);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "SignUp Done",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Wrong " + error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const UserInputValidation = z.object({
      email: z.string().trim().email("Invalid email address"),

      password: z
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(15, "Password must be at most 15 characters"),
    });

    const parsingData = UserInputValidation.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(400).json({
        message: parsed.error.errors[0].message,
      });
    }

    const { email, password } = parsingData?.data;
    const verifyData = await User.findOne({ email }).select("+password");
    if (!verifyData) {
      return res.status(500).json({
        message: "Invaild data",
      });
    }

    const camparePass = await bcrypt.compare(password, verifyData.password);
    if (!camparePass) {
      return res.status(401).json({
        message: "Invaild data",
      });
    }
    const token = jwt.sign(
      {
        _id: verifyData._id,
      },
      process.env.JWT_PASS,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true, 
      secure: false, 
      sameSite: "strict", 
      maxAge: 24 * 60 * 60 * 1000, // 1 days
    });
    res.json({
        message : "SignIn done"
    })
  } catch (error) {
    return res.status(401).json({
      message: "Something Wrong" + error,
    });
  }
});
app.get("/logout" , (req , res)=>{
    try {
        res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
     return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    } catch (error) {
        return res.json({
            message : "Logout failed"
        })
    }
})
const main = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
      console.log("Server Started");
    });
  } catch (error) {
    console.log("Faild " + error);
  }
};

main();
