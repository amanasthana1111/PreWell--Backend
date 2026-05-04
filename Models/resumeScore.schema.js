import mongoose from "mongoose";

const { Schema } = mongoose;

const ResumeScoreSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  ats_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    index: true,
  },
  profile_type: {
    type: String,
    default: "",
  },
  primary_stack: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ResumeScoreSchema.index({ userId: 1, ats_score: -1 });

const ResumeScore = mongoose.model("ResumeScore", ResumeScoreSchema);

export { ResumeScore };
