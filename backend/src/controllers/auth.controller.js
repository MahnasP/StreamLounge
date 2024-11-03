import { User } from "../models/user.model.js";

const signup = async (req,res) => {
    try {
        const { username, email } = req.body;
        if (!req.body.username) return res.status(400).json({ error: "empty req body" });
        
        const user = await User.findOne({ name: username });
        if (user) return res.status(400).json({ error: "user already exists" });
        const profilepic = "https://avatar.iran.liara.run/public";
        const createdUser = await User.create({
            name: username,
            email: email,
            profilepic: profilepic,
        });
        res.status(201).json({
            _id:createdUser._id,
            username: createdUser.name,
            email: createdUser.email,
            profilepic: createdUser.profilepic,
        });
    } catch (error) {
        console.log("Signup error: ", error);
        next(error);
    }
}

export { signup };