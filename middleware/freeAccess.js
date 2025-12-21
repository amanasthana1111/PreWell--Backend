import { User } from "../Models/user.schema.js";

export const checkAccess = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const UserPlan = await User.findById(user_id).select("plan freeRequestsLeft");
    if (!UserPlan) {
      return res.json({
        message: "Something wrong",
      });
    }
    if (UserPlan.plan === "paid") {
      return next();
    }
    if (UserPlan.freeRequestsLeft <= 0) {
      return res.status(403).json({
        message: "Free limit reached. Please upgrade your plan.",
      });
    }
    await User.updateOne(
      { _id: user_id, freeRequestsLeft: { $gt: 0 } },
      { $inc: { freeRequestsLeft: -1 } }
    );

    next();
  } catch (error) {
    res.status(500).json({ message: "Access check failed", error });
  }
};
