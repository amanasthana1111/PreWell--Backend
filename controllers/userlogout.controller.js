import jwt from "jsonwebtoken";
import redisClient from "../DB/redisConnection.js";

const userLogout = async (req, res) => {
  try {
    const token = req.cookies.token;
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // REQUIRED
      sameSite: "none", // REQUIRED
    });
    const {exp} = jwt.decode(token);
    
    const a = await redisClient.set(`token:${token}` , "Blocked");
    await redisClient.expireAt(`token:${token}` , exp);

    

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(402).json({
      message: "Logout failed" + error,
    });
  }
};

export default userLogout;
