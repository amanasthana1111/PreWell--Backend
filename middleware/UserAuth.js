import jwt from "jsonwebtoken";


const UserAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token){
      return res.json({
        message : "Login first"
      })
    }
    const decodedToken = jwt.verify(token, process.env.JWT_PASS);
    if (!decodedToken) {
      return res.json({
        message: "logIn First",
      });
    }
    req.user_id = decodedToken._id;
    next();
  } catch (error) {
    return res.json({
      message: "logIn First ",
    });
  }
};

export default UserAuth;
