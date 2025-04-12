import { User } from "../models/user.model.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "podcasts",
        populate: {
          path: "creator",
          select: "name profilepic",
        },
      })
      .populate({
        path: "favorites",
        populate: {
          path: "creator",
          select: "name profilepic",
        },
      });
    res.status(200).json(user);
    //console.log("User data fetched: ", user);
  } catch (error) {
    console.log("getUser error: ", error);
    res.status(500).json({ error: "Error in fetching user" });
  }
};

export { getUser };
