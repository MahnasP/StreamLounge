import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        if (!req.body.username) return res.status(400).json({ error: "empty req body" });
        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ error: "user with this email already exists" });

        const salt = bcrypt.genSaltSync(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const profilepic = "https://avatar.iran.liara.run/public";

        const createdUser = await User.create({
            name: username,
            email: email,
            profilepic: profilepic,
            password: hashedPass,
        });
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
        const user={
            _id:createdUser._id,
            username: createdUser.name,
            email: createdUser.email,
            profilepic: createdUser.profilepic,
        }
        res.status(201).json(token,user);
    } catch (error) {
        console.log("Signup error: ", error);
        res.status(500).json(err);
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(401).json({ message: 'Incorrect username or password' });
        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect username or password' });

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
        const user={
            _id:existingUser._id,
            username: existingUser.name,
            email: existingUser.email,
            profilepic: existingUser.profilepic,
        }

        res.status(201).json({ token, user });

    } catch (error) {
        console.log("Signin error: ", error);
        res.status(500).json(err);
    }
}

const googleSignin = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.status(201).json(token, req.user);
    } catch (error) {
        console.log("google signin error: ", error);
        res.status(500).json(err);
    }
}


export { signup, signin, googleSignin };