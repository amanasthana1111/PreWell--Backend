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

    skills: [
      {
        name: String,
        category: String,
        proficiency: Number,
      }
    ],

    education: [
      {
        degree: String,
        fieldOfStudy: String,
        institution: String,
        startYear: Number,
        endYear: Number,
        score: String,
      }
    ],

    experience: [
      {
        companyName: String,
        role: String,
        employmentType: String,
        techStack: [String],
        startDate: Date,
        endDate: Date,
      }
    ],

    projects: [
      {
        title: String,
        domain: String,
        techStack: [String],
        description: String,
        githubUrl: String,
      }
    ],

    contactInfo: {
      email: String,
      phone: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);


export const UserResume = mongoose.model("UserResume" , UserResumeSchema);