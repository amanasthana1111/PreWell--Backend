import { GoogleGenAI } from "@google/genai";

const googleGemini = async (customConfig,url,instruction,difficulty,no_of_Q)=>{
try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_KEY,
    });
    console.log(url)
    const pdfResp = await fetch(`${url}`).then((response) =>
      response.arrayBuffer()
    );
    const contents = [
      {
        text: ` Some User Perfercance = ${instruction},${difficulty},${no_of_Q} ,  ${customConfig } `,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(pdfResp).toString("base64"),
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    let raw = await response.text;
    let rawdata = raw
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(rawdata);
    const obj ={
      flag : false,
      data,

    };
    return obj;
} catch (error) {
   const obj ={
      flag : true,
      error,

    };
    return obj;
}
}

export default googleGemini;