import bcrypt from "bcrypt";
import { User } from "../Models/user.schema.js";
import UserInputValidation from "../Validation/UserRegister.validation.js";

const userRegister = async (req, res) => {
  try {
    const parsingData = UserInputValidation.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(400).json({
        message: parsingData.error,
      });
    }

    const { username, email, password } = parsingData?.data;

    const hashPassword = await bcrypt.hash(password, 5);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "SignUp Done",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Wrong " + error,
    });
  }
};

export default userRegister;
