import { userReportConfig } from "../config/userReportConfig.js";
import { reportAi } from "../utils/googleGemini2.js"

 export const Report = async (req,res )=>{
    const userObj = req.body;
    const responseData = await reportAi(userReportConfig,userObj);
    return res.status(200).json(responseData)
}
