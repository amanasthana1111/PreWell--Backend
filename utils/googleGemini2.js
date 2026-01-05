import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GENAI_KEY,});

export async function reportAi(customConfig,userReport) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `User report = ${userReport} and config =  ${customConfig}` ,
  });
  let raw = await response.text;
    let rawdata = raw
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(rawdata);
  return data;
}

