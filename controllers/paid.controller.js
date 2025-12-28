import { User } from "../Models/user.schema.js";
import { sumVerify } from "../Validation/sum.vaildation.js";

export const paidUser = async (req, res) => {
  try {
    
    const parsingData = sumVerify.safeParse(req.body);
    if (!parsingData.success) {
      return res.status(400).json({
        message: parsingData.error,
      });
    }

    const { firstNo, secondNo, sum, planAmount } = parsingData.data;
    const user_id = req.user_id;

    
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if (user.plan === "paid") {
    //   return res.json({ message: "You already have a subscription" });
    // }

    if (firstNo + secondNo !== sum) {
      return res.status(400).json({ message: "Invalid sum verification" });
    }

    
    const planMap = {
      10: 1,
      20: 2,
      30: 3,
    };

    const extraRequests = planMap[planAmount];
    if (!extraRequests) {
      return res.status(400).json({ message: "Invalid plan amount" });
    }

    
   const a =  await User.findByIdAndUpdate(
      user_id,
      {
        $inc: { freeRequestsLeft: extraRequests },
        $set: { plan: "paid" },
      },
      { new: true }
    );
    console.log(a)

    return res.json({
      message: "Subscription activated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
