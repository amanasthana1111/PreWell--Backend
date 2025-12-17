import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../Models/user.schema.js";

const userRegister = async (req, res) => {
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
        message: parsingData.error,
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
};

export default userRegister;
