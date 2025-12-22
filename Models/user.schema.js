import mongoose from "mongoose";
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
    resumesLink: {
      type: String,
      default: "",
    },
    plan: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    freeRequestsLeft: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export { User };
