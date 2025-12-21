import { Ats_System_config } from "../config/atsSystemConfig.js";
import { User } from "../Models/user.schema.js";
import googleGemini from "../utils/googleGemini.js";

const atsScanner = async(req,res)=>{
const user_id = req.user_id;
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
  const AtsObj = await googleGemini(Ats_System_config, resumeLink);
    const { flag } = AtsObj;
    if (flag) {
      return res.json({
        message: "Something problem" + AtsObj.error,
      });
    }
    return res.json(AtsObj.data);
}

export default atsScanner;