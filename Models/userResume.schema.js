import mongoose from "mongoose";
const { Schema } = mongoose;

const UserResumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: String,
    summary: { type: String, default: "" },

    skills: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const UserResume = mongoose.model("UserResume", UserResumeSchema);
