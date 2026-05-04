import { unlink } from "fs/promises";
import { Comparison } from "../Models/comparison.schema.js";
import { ResumeScore } from "../Models/resumeScore.schema.js";
import { compareResumeTexts, extractPdfText } from "../utils/resumeAnalysis.service.js";

const cleanupFiles = async (files = []) => {
  await Promise.allSettled(files.map((file) => unlink(file.path)));
};

export const compareResumes = async (req, res) => {
  const resumeA = req.files?.resumeA?.[0];
  const resumeB = req.files?.resumeB?.[0];
  const uploadedFiles = [resumeA, resumeB].filter(Boolean);

  try {
    if (!resumeA || !resumeB) {
      await cleanupFiles(uploadedFiles);
      return res.status(400).json({ message: "Both resumeA and resumeB PDF files are required" });
    }

    let resumeAText = "";
    let resumeBText = "";

    try {
      [resumeAText, resumeBText] = await Promise.all([
        extractPdfText(resumeA.path),
        extractPdfText(resumeB.path),
      ]);
    } catch (error) {
      await cleanupFiles(uploadedFiles);
      return res.status(400).json({ message: "Could not extract text from one or both PDF files" });
    }

    if (!resumeAText || !resumeBText) {
      await cleanupFiles(uploadedFiles);
      return res.status(400).json({ message: "Could not extract text from one or both PDF files" });
    }

    const jobDescription = typeof req.body.jobDescription === "string"
      ? req.body.jobDescription.trim()
      : "";

    const comparison = await compareResumeTexts({
      resumeAText,
      resumeBText,
      jobDescription,
    });

    await Comparison.create({
      userId: req.user_id,
      resumeAName: resumeA.originalname,
      resumeBName: resumeB.originalname,
      jobDescription,
      winner: comparison.winner,
      resumeAScore: comparison.resumeA.ats_score,
      resumeBScore: comparison.resumeB.ats_score,
      finalVerdict: comparison.final_verdict,
      recommendations: comparison.recommendations,
    });

    await cleanupFiles(uploadedFiles);
    return res.json(comparison);
  } catch (error) {
    await cleanupFiles(uploadedFiles);
    return res.status(500).json({ message: "Resume comparison failed" });
  }
};

export const getResumeLeaderboard = async (req, res) => {
  try {
    const leaders = await ResumeScore.aggregate([
      { $sort: { userId: 1, ats_score: -1, createdAt: -1 } },
      {
        $group: {
          _id: "$userId",
          userId: { $first: "$userId" },
          username: { $first: "$username" },
          ats_score: { $first: "$ats_score" },
          profile_type: { $first: "$profile_type" },
          primary_stack: { $first: "$primary_stack" },
          total_scans: { $sum: 1 },
        },
      },
      { $sort: { ats_score: -1, username: 1 } },
      { $limit: 20 },
    ]);

    const leaderboard = leaders.map((item, index) => ({
      rank: index + 1,
      userId: item.userId.toString(),
      username: item.username,
      ats_score: item.ats_score,
      profile_type: item.profile_type,
      primary_stack: item.primary_stack,
      total_scans: item.total_scans,
    }));

    return res.json({ leaderboard });
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch resume leaderboard" });
  }
};
