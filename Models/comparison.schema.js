import mongoose from "mongoose";

const { Schema } = mongoose;

const ComparisonSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  resumeAName: {
    type: String,
    required: true,
  },
  resumeBName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    default: "",
  },
  winner: {
    type: String,
    enum: ["resumeA", "resumeB", "Tie"],
    required: true,
  },
  resumeAScore: {
    type: Number,
    required: true,
  },
  resumeBScore: {
    type: Number,
    required: true,
  },
  finalVerdict: {
    type: String,
    required: true,
  },
  recommendations: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comparison = mongoose.model("Comparison", ComparisonSchema);

export { Comparison };
