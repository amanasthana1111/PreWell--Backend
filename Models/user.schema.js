import mongoose from "mongoose";
import { tr } from "zod/v4/locales";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 15,
      immutable: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    resumesLink:{
      type : String,
      default: ""
    }
  },
  { timestamps: true }
);


const User = mongoose.model("User" , UserSchema);

export {User};