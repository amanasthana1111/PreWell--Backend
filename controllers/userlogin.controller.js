import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../Models/user.schema.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
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
      message: "SignIn done",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something Wrong" + error,
    });
  }
};

export default userLogin;
