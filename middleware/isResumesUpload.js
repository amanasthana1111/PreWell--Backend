import { User } from "../Models/user.schema.js";

export const isResumesUpload = async (req, res, next) => {
  try {
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const userData = await User.findById(user_id);

    if (!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { resumesLink } = userData;

    if (!resumesLink || resumesLink.length === 0) {
      return res.status(400).json({
        message: "Please upload resume first",
      });
    }

    next();
  } catch (error) {
    console.error("Resume check error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
