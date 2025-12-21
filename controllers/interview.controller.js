import { User } from "../Models/user.schema.js";
import SYSTEM_CONFIG from "../utils/systemCongfig1.js";
import googleGemini from "../utils/googleGemini.js"

export const interview = async (req, res) => {
  const user_id = req.user_id;
  let { instruction, difficulty, no_of_Q } = req.body;
  if (!instruction) {
    instruction = "";
  }
  if (!difficulty) {
    difficulty = "easy";
  }
  if (!no_of_Q) {
    no_of_Q = 10;
  }
  const user = await User.findById(user_id);
  if (!user) {
    return res.json({
      message: "User Not Found",
    });
  }
  const resumeLink = user.resumesLink;
  if(!resumeLink){
    return res.json({
      message : "ADD RESUMES FIRST"
    })
  }
  

  const QuestionObj = await googleGemini(SYSTEM_CONFIG, resumeLink,instruction,difficulty,no_of_Q);
  const { flag } = QuestionObj;
  if (flag) {
    return res.json({
      message: "Something problem" + QuestionObj.error,
    });
  }
  return res.json(QuestionObj.data);
};
