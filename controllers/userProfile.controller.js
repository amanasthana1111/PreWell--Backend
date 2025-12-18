import { UserResume } from "../Models/userResume.schema.js";

const Profile = async (req, res) => {
  try {
    const userId = req.user_id;
    if(!userId){
      return res.json({
        message : "Login First"
      })
    }

    // ✅ correct populate
    const userResume = await UserResume
      .findOne({ user: userId })
      .populate("user", "email username");

    if (!userResume) {
      return res.status(404).json({
        message: "User resume not found",
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
    } = userResume;

    res.json({
      username: userResume.user.username, // ✅ from User table
      email: userResume.user.email,       // ✅ from User table
      fullName,
      summary,
      skills,
      education,
      experience,
      projects,
      contactInfo,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch profile" + error,
    });
  }
};

export default Profile;
