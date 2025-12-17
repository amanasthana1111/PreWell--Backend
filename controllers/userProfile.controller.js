import { User } from "../Models/user.schema.js";

const Profile = async (req, res) => {
  const id = req._id;
  const a = await User.findById(id);
  res.json({
    _id: id,
    username: a.username,
  });
};

export default Profile;
