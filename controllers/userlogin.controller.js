import bcrypt from "bcrypt";
import { User } from "../Models/user.schema.js";
import jwt from "jsonwebtoken";
import UserLoginInputValidation from "../Validation/UserLogin.validation.js";

const userLogin = async (req, res) => {
  try {
    const parsingData = UserLoginInputValidation.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(400).json({
        message: parsingData.error.errors[0].message
      });
    }

    const { email, password } = parsingData?.data;
    const verifyData = await User.findOne({ email }).select("+password");
    if (!verifyData) {
      return res.status(500).json({
        message: "Invaild data",
      });
    }

    const camparePass = await bcrypt.compare(password, verifyData.password);
    if (!camparePass) {
      return res.status(401).json({
        message: "Invaild data",
      });
    }
    const token = jwt.sign(
      {
        _id: verifyData._id,
        username : verifyData.username,
        plan : verifyData.plan,
        email : verifyData.email
      },
      process.env.JWT_PASS,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 days
    });
    res.json({
      message: "SignIn done",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something Wrong" + error,
    });
  }
};

export default userLogin;
