
import { User } from "../Models/user.schema.js";
import { UserResume } from "../Models/userResume.schema.js";
import UserInputVali from "../Validation/UserProfile.Validation.js";

const editProfile = async (req, res) => {
  try {
    const id = req.user_id;
    if(!id){
      return res.json({
        message : "Login First"
      })
    }
    console.log(id)
    const UserData = await User.findOne({ _id: id })
    if (!UserData) {
      return res.json({
        message: "User Not found",
      });
    }
    const parsingData = UserInputVali.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(401).json({
        message: "Invaild Input",
      });
    }
    const {
      fullName,
      summary,
      skills,
      education,
      experience,
      projects,
      contactInfo,
    } = parsingData.data;

    const resumeData = await UserResume.findOneAndUpdate(
      { user: id },
      {
        user: id,
        fullName,
        summary,
        skills,
        education,
        experience,
        projects,
        contactInfo
      },
      {
        upsert: true, // create if not exists
        new: true
      }
    );

    res.json({
      message :"DONE"
    });
  } catch (error) {
    return res.json({
      message : "Something Wrong" + error,
    })
  }
};

export default editProfile;
