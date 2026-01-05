import { userReportConfig } from "../config/userReportConfig.js";
import { reportAi } from "../utils/googleGemini2.js"

 export const Report = async (req,res )=>{
    const userObj = req.body;
    const responseData = await reportAi(userReportConfig,userObj);
    console.log(responseData)
    return res.json({
        mess : "done"
    })
}
