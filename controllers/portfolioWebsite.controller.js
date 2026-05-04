import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import cloudinary from "../utils/cloudinary.js";
import Portfolio_Website_Config from "../config/portfolioWebsiteConfig.js";

const parseJsonResponse = (raw) => {
  const rawData = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(rawData);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isTemporaryModelError = (error) => {
  const message = error?.message || "";
  return (
    message.includes('"code":503') ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  );
};

const generateContentWithFallback = async (ai, contents) => {
  const models = [
    process.env.GOOGLE_GENAI_MODEL || "gemini-2.5-flash",
    process.env.GOOGLE_GENAI_FALLBACK_MODEL || "gemini-2.5-flash-lite",
    "gemini-2.0-flash",
  ];
  let lastError;

  for (const model of [...new Set(models)]) {
    for (const delay of [0, 1200]) {
      if (delay) {
        await wait(delay);
      }

      try {
        return await ai.models.generateContent({
          model,
          contents,
        });
      } catch (error) {
        lastError = error;

        if (!isTemporaryModelError(error)) {
          throw error;
        }
      }
    }
  }

  throw lastError;
};

const generatePortfolioWebsite = async (req, res) => {
  let localFilePath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    localFilePath = req.file.path;

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
      folder: "portfolio-resumes",
    });

    const pdfResponse = await fetch(uploadResult.secure_url);
    if (!pdfResponse.ok) {
      return res.status(502).json({
        success: false,
        message: "Could not read uploaded PDF",
      });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_KEY,
    });

    const response = await generateContentWithFallback(ai, [
      {
        text: Portfolio_Website_Config,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(pdfBuffer).toString("base64"),
        },
      },
    ]);

    const data = parseJsonResponse(response.text);

    if (!data?.html || typeof data.html !== "string") {
      return res.status(502).json({
        success: false,
        message: "AI response did not include generated HTML",
      });
    }

    return res.status(200).json({
      success: true,
      html: data.html,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Portfolio website generation failed",
      error: error.message,
    });
  } finally {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

export default generatePortfolioWebsite;
