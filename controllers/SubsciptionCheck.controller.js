import { User } from "../Models/user.schema.js";

export const UserSub = async (req, res) => {
  try {
    const user_id = req.user_id;
    const UserPlan = await User.findById(user_id).select(
      "plan freeRequestsLeft"
    );
    if (!UserPlan) {
      return res.status(403).json({
        message: "Something wrong  " + UserPlan,
      });
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
    res.status(201).json({
        message  : "Access"
    })

  } catch (error) {
    res.status(500).json({ message: "Access check failed", error });
  }
};
