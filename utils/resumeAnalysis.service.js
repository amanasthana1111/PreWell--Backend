import { readFile } from "fs/promises";
import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import { Resume_Comparison_System_Config } from "../config/resumeComparisonConfig.js";
import { ResumeScore } from "../Models/resumeScore.schema.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_KEY,
});

const parseJsonResponse = (raw) => {
  const rawData = raw
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(rawData);
};

const clampScore = (score) => {
  const value = Number(score);
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
};

export const extractPdfText = async (filePath) => {
  const buffer = await readFile(filePath);
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text.trim();
  } finally {
    await parser.destroy();
  }
};

export const compareResumeTexts = async ({
  resumeAText,
  resumeBText,
  jobDescription = "",
}) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: `${Resume_Comparison_System_Config}

Job description:
${jobDescription || "Not provided"}

Resume A:
${resumeAText}

Resume B:
${resumeBText}`,
      },
    ],
  });

  const data = parseJsonResponse(response.text);
  const resumeAScore = clampScore(data?.resumeA?.ats_score ?? data?.resumeA?.score);
  const resumeBScore = clampScore(data?.resumeB?.ats_score ?? data?.resumeB?.score);

  return {
    winner: ["resumeA", "resumeB", "Tie"].includes(data.winner)
      ? data.winner
      : resumeAScore > resumeBScore
        ? "resumeA"
        : resumeBScore > resumeAScore
          ? "resumeB"
          : "Tie",
    final_verdict: data.final_verdict || "Both resumes were compared successfully.",
    resumeA: {
      score: clampScore(data?.resumeA?.score ?? resumeAScore),
      ats_score: resumeAScore,
      summary: data?.resumeA?.summary || "",
      strengths: Array.isArray(data?.resumeA?.strengths) ? data.resumeA.strengths : [],
      weaknesses: Array.isArray(data?.resumeA?.weaknesses) ? data.resumeA.weaknesses : [],
    },
    resumeB: {
      score: clampScore(data?.resumeB?.score ?? resumeBScore),
      ats_score: resumeBScore,
      summary: data?.resumeB?.summary || "",
      strengths: Array.isArray(data?.resumeB?.strengths) ? data.resumeB.strengths : [],
      weaknesses: Array.isArray(data?.resumeB?.weaknesses) ? data.resumeB.weaknesses : [],
    },
    recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
  };
};

export const saveResumeScore = async ({ user, atsData }) => {
  if (!user || !atsData || typeof atsData.ats_score === "undefined") {
    return null;
  }

  return ResumeScore.create({
    userId: user._id,
    username: user.username,
    ats_score: clampScore(atsData.ats_score),
    profile_type: atsData?.resume_summary?.profile_type || "",
    primary_stack: Array.isArray(atsData?.resume_summary?.primary_stack)
      ? atsData.resume_summary.primary_stack
      : [],
  });
};
