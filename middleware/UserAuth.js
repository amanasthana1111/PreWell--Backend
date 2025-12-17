import jwt from "jsonwebtoken";


const UserAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_PASS);
    if (!decodedToken) {
      return res.json({
        message: "logIn First",
      });
    }
    req._id = decodedToken._id;
    next();
  } catch (error) {
    return res.json({
      message: "logIn First ",
    });
  }
};

export default UserAuth;
