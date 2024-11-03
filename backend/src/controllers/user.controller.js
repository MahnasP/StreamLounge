import { User } from "../models/user.model.js";

const getUser = async (req, res) => { 
    try {
        const user = await User.findById(req.user.id).populate(
            {
                path: "podcast",
                populate: {
                    path: "creator",
                    select: "name profilepic"
                }
            }.populate({
                path: "favorites",
                populate: {
                    path: "creator",
                    select: "name profilepic"
                }
            })
        )

        res.status(200).json(user);
        
    } catch (error) {
        console.log("getUser error: ", error);
        next(error);
    }
}

export { getUser };