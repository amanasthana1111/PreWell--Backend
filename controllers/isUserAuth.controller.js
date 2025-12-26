import jwt from "jsonwebtoken";
import redisClient from "../DB/redisConnection.js";


const isUserAuth =async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message : "Login first"
      })
    }
    const isBlocked = await redisClient.exists(`token:${token}`);
    if(isBlocked){
      return res.status(401).json({ message: "Invalid token" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_PASS);
    if (!decodedToken) {
      return res.status(401).json({
        message: "logIn First",
      });
    }
    req.user_id = decodedToken._id;
    return res.json({
      username : decodedToken.username,
        message : "User is Vaild"
    })
  } catch (error) {
    return res.status(401).json({
      message: "logIn First ",
    });
  }
};

export default isUserAuth;
