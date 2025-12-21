import { User } from "../Models/user.schema.js";

import googleGemini from "../utils/googleGemini.js";
import Interview_SYSTEM_CONFIG from "../config/InterviewSystemCongfig1.js";

export const interview = async (req, res) => {
  try {
    const user_id = req.user_id;
  const instruction = req.body.instruction ?? "";
  const difficulty = req.body.difficulty ?? "easy";
  const no_of_Q = Number(req.body.no_of_Q ?? 10);
  const user = await User.findById(user_id);
  if (!user) {
    return res.json({
      message: "User Not Found",
    });
  }
  const resumeLink = user.resumesLink;
  if (!resumeLink) {
    return res.json({
      message: "ADD RESUMES FIRST",
    });
  }

  const QuestionObj = await googleGemini(
    Interview_SYSTEM_CONFIG,
    resumeLink,
    instruction,
    difficulty,
    no_of_Q
  );
  const { flag } = QuestionObj;
  if (flag) {
    return res.json({
      message: "Something problem" + QuestionObj.error,
    });
  }
  return res.json(QuestionObj.data);
  } catch (error) {
    return res.json({
    message : "Something broke" + error
  })
  }
};
